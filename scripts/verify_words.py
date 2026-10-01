# -*- coding: utf-8 -*-
with open('src/data/usWarEconomyCaptions.ts', 'r', encoding='utf-8') as f:
    content = f.read()

checks = [
    ('phe', 'phê'),
    ('xâm', 'sâm'),
    ('lạm', 'lạng'),
    ('trăm', 'trang'),
    ('ninh', 'Anning'),
    ('hòa', 'hợp'),
    ('bên', 'đên'),
    ('hữu', 'hiệu'),
    ('phân', 'phần'),
    ('màn', 'mặt'),
    ('chục', 'trục'),
    ('tàu', 'tầu'),
    ('chở', 'trở'),
    ('âm', 'ân')
]

for correct, wrong in checks:
    has_correct = f'"word": "{correct}"' in content or f'"word": "{correct.capitalize()}"' in content
    has_wrong = f'"word": "{wrong}"' in content
    print(f'{correct:10}: correct={has_correct:<5} | wrong ({wrong}): {has_wrong}')
