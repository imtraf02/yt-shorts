import ctypes
import json
import platform
import sys

details = {"python": sys.version, "processor": platform.processor(), "cudaDriverPresent": False}
try:
    cuda = ctypes.WinDLL("nvcuda.dll")
    details["cudaDriverPresent"] = True
    details["cudaInitResult"] = int(cuda.cuInit(0))
    count = ctypes.c_int()
    details["cudaDeviceCountResult"] = int(cuda.cuDeviceGetCount(ctypes.byref(count)))
    details["cudaDeviceCount"] = count.value
except OSError as exc:
    details["cudaDriverError"] = str(exc)
print(json.dumps(details, ensure_ascii=False))
