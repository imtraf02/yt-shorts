import json
import sys

sys.stdout.reconfigure(encoding='utf-8')
tokens = json.load(open('whisper_chaplin_captions.json', encoding='utf-8'))
for i in range(32, 45):
    print(f"{i:2d}: '{tokens[i]['text']}' ({tokens[i]['startMs']}-{tokens[i]['endMs']} ms)")
