import os

a = r"D:\hvprojekt\Tisza-parti-jatekbolt\img\lego\f1\logok"
def rename_images_in_folder(a):
    image_extensions = (".jpg", ".jpeg", ".png", ".bmp", ".gif")
    try:
        files = [f for f in os.listdir(a) if f.lower().endswith(image_extensions)]
        for index, file_name in enumerate(files, start=1):
            old_path = os.path.join(a, file_name)
            new_name = f"logo{index}{os.path.splitext(file_name)[1]}"
            new_path = os.path.join(a, new_name)
            os.rename(old_path, new_path)
            print(f"{file_name} -> {new_name}")
        print("Az összes kép átnevezése kész!")
    except Exception as e:
        print(f"Hiba történt: {e}")

rename_images_in_folder(a)