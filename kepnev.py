import os

# filepath: d:\hvprojekt\rename_images.py
# Add meg a mappa elérési útját, ahol a képek vannak
folder_path = r"D:\hvprojekt\Tisza-parti-jatekbolt\img\lego\f1\logok"
def rename_images_in_folder(folder_path):
    # Csak képfájlok kiterjesztései
    image_extensions = (".jpg", ".jpeg", ".png", ".bmp", ".gif")
    try:
        files = [f for f in os.listdir(folder_path) if f.lower().endswith(image_extensions)]
        for index, file_name in enumerate(files, start=1):
            old_path = os.path.join(folder_path, file_name)
            new_name = f"logo{index}{os.path.splitext(file_name)[1]}"
            new_path = os.path.join(folder_path, new_name)
            os.rename(old_path, new_path)
            print(f"{file_name} -> {new_name}")
        print("Az összes kép átnevezése kész!")
    except Exception as e:
        print(f"Hiba történt: {e}")

rename_images_in_folder(folder_path)