# Importing the dependencies
from bs4 import BeautifulSoup
from splinter import Browser
import requests
import time
import pandas as pd
import googlemaps

import re
import pymongo

import datetime as dt
from config import api_key

# Creating the type of animals we want to search
# pet_type = ['cat', 'dog']

# Creating a function to initialize browser


def init_browser():
    # defining browser using splinter
    # for windows
    # executable_path = {'executable_path': 'chromedriver.exe'}
    # return Browser('chrome', **executable_path, headless=False)
    # for mac
    executable_path = {'executable_path': '/usr/local/bin/chromedriver'}
    return Browser('chrome', **executable_path, headless=False)


# Recodes the cat/dog age to one of the age groups (kitten, puppy, young, adult, senior), if needed
def assign_age_group (pet_type, age_string):
    if(pet_type == "cat"):
        vals = age_string.split()
        # print(vals)
        if(vals[1] == "years"): # young, adult, or senior
            if(int(vals[0]) >= 7): # senior 7+ years
                return "senior"
            elif(int(vals[0]) > 3): # adult 3-6 years
                return "adult"
            else: # young 2 years
                return "young"
        else: # kitten <= 1 year
            return "kitten"
    elif(pet_type == "dog"):
        return age_string.split(",")[1].strip()

# function to scrape data
def scrape_pet_info(pet_type):

    browser = init_browser()
    # Creating Url for pet scrapping
    url = "https://www.adoptapet.com/" + pet_type + \
        "-adoption/search/50/miles/Chicago,%20IL"
    browser.visit(url)
    html = browser.html
    soup = BeautifulSoup(html, 'html.parser')

    # the following code was for testing purpose

    # results = soup.find_all('div', class_='pet-card')
    # pet_name = soup.find(attrs={"data-pet-card": "pet-card-heading"}).text.strip()
    # sex = soup.find(attrs={"data-pet-card": "sex"}).text.strip()
    # age = soup.find(attrs={"data-pet-card": "age"}).text.strip()
    # location = soup.find(attrs={"data-pet-card": "city"}).text.strip() \
    #             + ", " + soup.find(attrs={"data-pet-card": "state"}).text.strip()
    # link = results[0].a['href']
    # print(pet_name)
    # print(sex)
    # print(age)
    # print(location)
    # print(link)
    # pet_card = {
    #                 'pet_name': pet_name,
    #                 'pet_type': pet_type,
    #                 'sex':sex,
    #                 'age': age,
    #                 'location': location,
    #                 'link': link,

    #             }
    # store_pet_data(pet_card)

    num_pages = soup.find(
        attrs={"data-pagination": "pagination-pager"}).span.text
    num_pages = re.findall(r"\d+$", num_pages)[0]
    print("There are " + str(num_pages) + " pages of search results")
    next_page_url = url + "#current_page="
    print(next_page_url)
    for page_num in range(1,int(num_pages)+1):

        next_page_url = url + "#current_page=" + str(page_num)
        # print(next_page_url)

        browser.visit(next_page_url)
        html = browser.html
        soup = BeautifulSoup(html, 'html.parser')

        time.sleep(30)
        # Retrieve all the pet cards on the current page
        results = soup.find_all('div', class_='pet-card')
        print("There are " + str(len(results)) + " results on Page " +
              str(page_num) + " of " + str(num_pages))

    # Loop through each page of results. There are up to 40 results per page.
        for result in results:
            try:
                # # Check that pet page still exists
                # if(result.find('div', class_='pet-error')):
                #     print(result.a['href'])
                #     print(result.find('div', class_='pet-error').div.h3.text)
                #     pass
                # else:
                # print(result)
                pet_name = result.find(
                    attrs={"data-pet-card": "pet-card-heading"}).text.strip()
                # Format location name so that only the first letter of city is capitalized
                location = result.find(attrs={"data-pet-card": "city"}).text.strip().title() \
                    + ", " + \
                    result.find(attrs={"data-pet-card": "state"}).text.strip().upper()
                link = result.a['href']
                # print(link)

                # visit the link to the pet page
                browser.visit(link)
                p_html = browser.html
                p_soup = BeautifulSoup(p_html, 'html.parser')

                # Check that pet page still exists
                if(p_soup.find('div', class_='pet-error')):
                    print("Pet Not Found")
                    print(p_soup.a['href'])
                    print(p_soup.find('div', class_='pet-error').div.h3.text)
                    pass
                else:
                    # Store information into a dictionary
                    pet_card = {
                        'pet_name': pet_name,
                        'pet_type': pet_type,
                        'sex': "",
                        'age': "",
                        'location': location,
                        'link': link,
                        'breed': "",
                        'color': "",
                        'size': "",  # dogs
                        'weight': "",  # dogs
                        'pet_id': "",
                        'hair': "",  # cats
                        'rescue': "",
                        'address': "",
                        'date':""
                    }

                    # Gather info from Facts About Me section
                    p_facts_section = p_soup.find_all(
                        attrs={"data-pet-detail": "pet-facts-content-section"})

                    for item in p_facts_section:
                        label = item.find(
                            attrs={"data-pet-detail": "pet-facts-label"})
                        value = item.find('div', class_="h4--light")
                        if(value):
                            label_str = label.text.strip().lower().replace(" ", "_")
                            value = value.text.strip()
                            if(label_str == "age"):
                                if(value not in ["", "kitten","puppy","young","adult","senior"]):
                                    pet_card[label_str] = assign_age_group(pet_type,value)
                                else :
                                      pet_card[label_str] = value   
                            else:
                                 pet_card[label_str] = value
                           
                        

                    # Rescue or Private Owner
                    shelterinfo_label = p_soup.find(
                        'h5', class_='shelterinfo__label').text.strip()
                    if(shelterinfo_label == 'Rescue'):
                        # If it's a rescue, get shelter name and location
                        pet_card['rescue'] = p_soup.find(
                            'h1', class_='shelterinfo__header').text.strip()

                        if(p_soup.find('div', class_='gtm-plain-text-address')):
                            pet_card['address'] = p_soup.find(
                                'div', class_='gtm-plain-text-address').text.strip()
                        else:
                            pet_card['address'] = p_soup.find(
                                'a', class_='gtm-shelter-map').text.strip()
                    else:
                        # If it's a private owner, pet_rescue is "Private Owner" and pet_address is location
                        pet_card['rescue'] = "Private Owner"
                        pet_card['address'] = location

                    # Gather info from My Info section, if available
                    p_info = p_soup.find(attrs={"data-pet-detail": "myinfo-content"})
                    if(p_info):
                        p_info_list = p_info.find_all(attrs={"data-h4": "heading-compact"})
                        for item in p_info_list:
                            pet_card[item.text] = 'Yes'  
                    # Call the function here to insert data into mongo 
                    # Adding the date to pet_card
                    pet_card['date']=dt.datetime.utcnow()
                    store_pet_data(pet_card)
                    # # Gather info from My Info section, if available
                    # p_info = p_soup.find(
                    #     attrs={"data-pet-detail": "myinfo-content"})
                    # if(p_info):
                    #     p_info_list = p_info.find_all(
                    #         attrs={"data-h4": "heading-compact"})
                    #     for item in p_info_list:
                    #         pet_card[item.text] = 'Yes'
                    # # Call the function here to insert data into mongo
                    # store_pet_data(pet_card)
                    # # writer.writerow(pet_card)

                    pet_card.clear()

            except Exception as err:
                print(result.a['href'])
                print(err)
                pass
    # Quit browser after scraping
    browser.quit()

# function to store data
def createDBConnection():
    conn = 'mongodb://localhost:27017'
    client = pymongo.MongoClient(conn)
    db = client.pets2
    # db.pets_info.drop()
    return db

def store_pet_data(pet_card):   
        db=createDBConnection()
  
        # print("inside insert")
        db.pets_info.insert_one(pet_card)

def addingLocationPet():

    db=createDBConnection()
    unique_address=list(db.pets_info.distinct("address"))
    # location_data={}

    for address in unique_address:
        # print(address)
        gmaps = googlemaps.Client(key=api_key)
        # Geocoding an address
        geocode_result = gmaps.geocode(address)
        location=geocode_result[0]['geometry']['location']
        # print(f"{address}  , {location }")        
        # location_data[address]=location
        updateResult = db.pets_info.update_many({'address': address}, {'$set': {'location_data': location}})
        print(updateResult)
        
    # print(location_data)

    # for address, location in location_data.items():
        


    # //find all the the pets with a given location
    # for(key,value)in location_data:
    #     # db.pets_info.update_many({ "address": key },{$set: { 'location_data': value}})
    #     # Update the venue in the order documents
    #     print(f"{key},{value}")
        # updateResult = db.pets_info.update_many({'address': key}, {'$set': {'location_data': value}})

    # for address in unique_address:
        # db.pets_info.find({})
        # db.pets_info.update_many({ "address": address },{$set: { 'location_data': location_data[address]}})

# pet_scrape.scrape_pet_info('cat')
# pet_scrape.scrape_pet_info('dog')
# pet_scrape.addingLocationPet()

# print(api_key)
# gmaps = googlemaps.Client(key=api_key)

# # Geocoding an address
# geocode_result = gmaps.geocode('1600 Amphitheatre Parkway, Mountain View, CA')
# print(geocode_result[0]['geometry']['location'])