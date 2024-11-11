import concurrent.futures
import csv
import requests
from PIL import Image, ImageOps
from bs4 import BeautifulSoup
from io import BytesIO


def fetch_image_url(searchTerm):
    searchUrl = "https://www.google.com/search?q={}&site=webhp&tbm=isch".format(
        searchTerm
    )
    d = requests.get(searchUrl).text
    soup = BeautifulSoup(d, "html.parser")

    img_tags = soup.find_all("img")

    for img in img_tags:
        if img["src"].startswith("http"):
            return img["src"]
    return None


def download_and_format_images(id, name, url):
    try:
        response = requests.get(url)
        if response.status_code == 200:
            image = Image.open(BytesIO(response.content))
            if image.mode != "RGBA":
                image = image.convert("RGBA")

            # Resize and crop to 300x300
            size = max(image.size)
            image = ImageOps.pad(image, (size, size), color=(0, 0, 0, 0))
            image = image.resize((300, 300), Image.LANCZOS)

            # Save the image to the output directory
            # Save the formatted image to disk
            new_filename = f"{id}.png"  # You can change the extension as needed
            image.convert("RGBA").save(new_filename, format="PNG")

            print(
                f"Image {name}: Successfully downloaded and formatted '{new_filename}'"
            )
        else:
            print(
                f"Image {name}: Failed to download image from '{url}' (Status code: {response.status_code})"
            )
    except Exception as e:
        print(
            f"Image {name}: An error occurred while processing image from '{url}': {e}"
        )


def process_product(product):
    product_id, product_name = product
    image_url = fetch_image_url(product_name)
    download_and_format_images(product_id, product_name, image_url)


# Read the CSV file
csv_file = "offer.csv"
products = []

with open(csv_file, newline="", encoding="utf-8") as file:
    reader = csv.reader(file)
    next(reader)  # Skip the header row if it exists
    for row in reader:
        product_id = row[0]
        product_name = row[1]
        print(f"Loaded: {product_name}")
        products.append((product_id, product_name))

# fetch url and download
with concurrent.futures.ThreadPoolExecutor() as executor:
    executor.map(process_product, products)

print("Processing complete!")
