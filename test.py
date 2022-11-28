# Creating an array
List = {
    "instance_1": {
        "age": 31,
        "dominant_emotion": "happy",
        "dominant_race": "white",
        "emotion": {
            "angry": 0.2756645204499364,
            "disgust": 3.083920319113531e-05,
            "fear": 0.5239023827016354,
            "happy": 67.02108383178711,
            "neutral": 29.57175076007843,
            "sad": 1.7532862722873688,
            "surprise": 0.8542800322175026
        },
        "gender": "Woman",
        "race": {
            "asian": 0.05465112952298698,
            "black": 0.0038303477149617426,
            "indian": 0.08727377218708528,
            "latino hispanic": 3.3318923909600016,
            "middle eastern": 5.098589813625205,
            "white": 91.42376133345135
        },
        "region": {
            "h": 919,
            "w": 919,
            "x": 419,
            "y": 301
        }
    },
    "seconds": 8.152041673660278,
    "trx_id": "c1482107-e955-45b7-8862-c6ee1552670a"
}
 
# Displaying the array
file = open("file1.txt", "w+")
 
# Saving the array in a text file
content = str(List)
file.write(content)
file.close()
 
# Displaying the contents of the text file
file = open("G:\\00_ZHAR_PROJECT_1\\JTK_POLBAN\\00_SEMESTER 5\Pengolahan Citra Digital Praktek\deepface\\file1.txt", "r")
content = file.read()
 
print("\nContent in file1.txt:\n", content)
file.close()