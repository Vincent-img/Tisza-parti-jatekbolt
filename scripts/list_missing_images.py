import os

root = os.path.dirname(os.path.abspath(__file__))
project_root = os.path.abspath(os.path.join(root, '..'))
img_root = os.path.join(project_root, 'img')
index_path = os.path.join(project_root, 'index.html')

with open(index_path, 'r', encoding='utf-8') as f:
    index = f.read()

missing = []
all_files = []
for dirpath, dirs, files in os.walk(img_root):
    for fn in files:
        full = os.path.join(dirpath, fn)
        rel = os.path.relpath(full, project_root).replace('\\', '/')
        all_files.append(rel)
        if rel not in index:
            missing.append(rel)

# Print results
print(f"Total images found: {len(all_files)}")
print(f"Images referenced in index.html: {len(all_files)-len(missing)}")
print('--- Missing image paths ---')
for p in missing:
    print(p)
