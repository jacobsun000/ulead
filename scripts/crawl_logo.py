import concurrent.futures
import requests
from PIL import Image, ImageOps
from bs4 import BeautifulSoup
from io import BytesIO

# Hardcoded list of schools with specified filenames
schools = [
    {"logo": "o1.png", "school": "Applewild School", "count": 2},
    {"logo": "o2.png", "school": "North Country School", "count": 1},
    {"logo": "o3.png", "school": "The Rectory School", "count": 3},
    {"logo": "o4.png", "school": "Hillside School", "count": 2},
    {"logo": "o5.png", "school": "Cardigan Mountain School", "count": 1},
    {"logo": "o6.png", "school": "The BementSchool", "count": 1},
    {"logo": "o7.png", "school": "Fay School", "count": 1},
    {"logo": "o8.png", "school": "Eaglebrook School", "count": 1},
]


def fetch_logo_url(school_name):
    search_url = "https://www.google.com/search?q={}&site=webhp&tbm=isch".format(
        school_name + " logo"
    )
    d = requests.get(search_url).text
    soup = BeautifulSoup(d, "html.parser")

    img_tags = soup.find_all("img")

    for img in img_tags:
        if img["src"].startswith("http"):
            return img["src"]
    return None


def download_and_save_logo(school, url):
    try:
        response = requests.get(url)
        if response.status_code == 200:
            image = Image.open(BytesIO(response.content))
            if image.mode != "RGBA":
                image = image.convert("RGBA")

            # Crop or pad to square
            length = max(image.height, image.width)
            new_size = (length, length)
            new_image = Image.new("RGBA", new_size, (255, 255, 255, 255))
            new_image.paste(
                image,
                (
                    (new_size[0] - image.width) // 2,
                    (new_size[1] - image.height) // 2,
                ),
            )
            image = new_image

            image = image.resize((300, 300), Image.LANCZOS)

            # Save the image to the specified path
            image.convert("RGBA").save(school["logo"], format="PNG")

            print(
                f"{school['school']}: Successfully downloaded and saved as '{school['logo']}'"
            )
        else:
            print(
                f"{school['school']}: Failed to download image from '{url}' (Status code: {response.status_code})"
            )
    except Exception as e:
        print(
            f"{school['school']}: An error occurred while processing image from '{url}': {e}"
        )


def process_school(school):
    school_name = school["school"]
    logo_url = fetch_logo_url(f"{school_name} Logo Square")
    if logo_url:
        download_and_save_logo(school, logo_url)
    else:
        print(f"{school_name}: No logo found.")


# Fetch URLs and download logos using ThreadPoolExecutor
with concurrent.futures.ThreadPoolExecutor() as executor:
    executor.map(process_school, schools)

print("Processing complete!")
