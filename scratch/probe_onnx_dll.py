import ctypes
import os
from pathlib import Path
import struct
import sys

def dependencies(path):
    data = path.read_bytes()
    pe = struct.unpack_from('<I', data, 0x3c)[0]
    sections = struct.unpack_from('<H', data, pe + 6)[0]
    size = struct.unpack_from('<H', data, pe + 20)[0]
    opt = pe + 24
    magic = struct.unpack_from('<H', data, opt)[0]
    dirs = opt + (112 if magic == 0x20b else 96)
    imports = struct.unpack_from('<I', data, dirs + 8)[0]
    table = opt + size
    def offset(rva):
        for index in range(sections):
            s = table + index * 40
            virtual_size, va, raw_size, raw_offset = struct.unpack_from('<IIII', data, s + 8)
            if va <= rva < va + max(virtual_size, raw_size):
                return raw_offset + rva - va
        return rva
    pos = offset(imports)
    names = []
    while data[pos:pos+20] != bytes(20):
        name_offset = offset(struct.unpack_from('<I', data, pos + 12)[0])
        names.append(data[name_offset:data.index(b'\0', name_offset)].decode())
        pos += 20
    return names

base = Path(sys.prefix) / 'Lib/site-packages/onnxruntime/capi'
handles = [os.add_dll_directory(str(base))]
for filename in ['onnxruntime.dll', 'onnxruntime_pybind11_state.pyd']:
    print(filename, dependencies(base / filename), flush=True)
    for name in dependencies(base / filename):
        if name.lower().startswith(('python', 'api-ms-')):
            continue
        try:
            ctypes.WinDLL(name)
        except OSError as exc:
            print('Failed dependency:', name, exc, flush=True)
try:
    import onnxruntime
    print('Loaded ONNX', onnxruntime.__version__, flush=True)
except Exception as exc:
    print('Import failed:', repr(exc), flush=True)
