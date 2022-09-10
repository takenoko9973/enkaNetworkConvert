import glob

file_name = ["header.js", "util.js", "enkaConverter.js", "main.js"]

content = []
for i in file_name:
    with open(i, 'r', encoding="utf-8") as f:
        content += f.read()

with open("Enka.Network_lang-jp.user.js", "w") as f:
    for line in content:
        f.write(line)
