import json
import re
import sys

def main():
    sys.stdout.reconfigure(encoding='utf-8')

    with open('scripts/aligned_steve_tokens.json', 'r', encoding='utf-8') as f:
        tokens = json.load(f)

    with open('scripts/steve_jobs_script.txt', 'r', encoding='utf-8') as f:
        lines = [line.strip() for line in f if line.strip()]

    print(f"Total script lines: {len(lines)}")
    print(f"Total tokens: {len(tokens)}")

    # Map the 29 script lines to the 24 scenes:
    # Scene 1: Line 0 (S01)
    # Scene 2: Line 1 (S02)
    # Scene 3: Line 2 (S03)
    # Scene 4: Line 3 (S04)
    # Scene 5: Line 4 (S05)
    # Scene 6: Line 5 (S06)
    # Scene 7: Line 6 (S07)
    # Scene 8: Line 7 (S08)
    # Scene 9: Line 8 (S09)
    # Scene 10: Line 9 (S10)
    # Scene 11: Lines 10 & 11 (S11 + S12: Boardroom coup & ousted)
    # Scene 12: Line 12 (S13: NeXT computer)
    # Scene 13: Line 13 (S14: Lucasfilm graphics / Pixar)
    # Scene 14: Line 14 (S15: Toy Story & Pixar IPO)
    # Scene 15: Lines 15 & 16 (S16 + S17: Apple near bankruptcy & NeXT acquired / Jobs return)
    # Scene 16: Line 17 (S18: 2x2 grid & Microsoft investment)
    # Scene 17: Line 18 (S19: iMac colors)
    # Scene 18: Lines 19 & 20 (S20 + S21: iPod & iTunes store)
    # Scene 19: Line 21 (S22: iPhone introduction)
    # Scene 20: Line 22 (S23: iPad introduction)
    # Scene 21: Lines 23 & 24 (S24 + S25: Reality distortion field & perfectionism)
    # Scene 22: Lines 25 & 26 (S26 + S27: Cancer diagnosis & Stanford speech)
    # Scene 23: Line 27 (S28: Passing away Oct 5 2011)
    # Scene 24: Line 28 (S29: Final tribute / dropout changing the world)

    scene_line_indices = [
        [0],        # 01: S01
        [1],        # 02: S02
        [2],        # 03: S03
        [3],        # 04: S04
        [4],        # 05: S05
        [5],        # 06: S06
        [6],        # 07: S07
        [7],        # 08: S08
        [8],        # 09: S09
        [9],        # 10: S10
        [10, 11],   # 11: S11 + S12
        [12],       # 12: S13
        [13],       # 13: S14
        [14],       # 14: S15
        [15, 16],   # 15: S16 + S17
        [17],       # 16: S18
        [18],       # 17: S19
        [19, 20],   # 18: S20 + S21
        [21],       # 19: S22
        [22],       # 20: S23
        [23, 24],   # 21: S24 + S25
        [25, 26],   # 22: S26 + S27
        [27],       # 23: S28
        [28],       # 24: S29
    ]

    cursor = 0
    line_tokens = []
    for l in lines:
        w_count = len(l.split())
        l_toks = tokens[cursor : cursor + w_count]
        cursor += w_count
        line_tokens.append(l_toks)

    scene_tokens = []
    for s_idx, l_indices in enumerate(scene_line_indices):
        st = []
        for li in l_indices:
            st.extend(line_tokens[li])
        scene_tokens.append(st)
        print(f"Scene {s_idx+1:02d} ({len(st):2d}w): {st[0]['startMs']:6d}ms -> {st[-1]['endMs']:6d}ms | {st[0]['word']} ... {st[-1]['word']}")

    print(f"Total scenes mapped: {len(scene_tokens)}")

if __name__ == '__main__':
    main()
