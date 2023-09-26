import csv
import firebase_admin

from firebase_admin import credentials
from firebase_admin import firestore

cred = credentials.Certificate("/Users/AlecSchram/Projects/bible-context/firebase/serviceAccountKey.json")
firebase_admin.initialize_app(cred)

db=firestore.client()

jc_file_path='/Users/AlecSchram/Documents/Bible Context Docs/Doctrine Collection/christCollection.csv'
ifm_file_path='/Users/AlecSchram/Documents/Bible Context Docs/Doctrine Collection/ifmCollection.csv'
med_file_path='/Users/AlecSchram/Documents/Bible Context Docs/Doctrine Collection/mediatorCollection.csv'
igf_file_path='/Users/AlecSchram/Documents/Bible Context Docs/Doctrine Collection/igfCollection.csv'
doc_file_path='/Users/AlecSchram/Documents/Bible Context Docs/Doctrine Collection/doctrineCollection.csv'
doctrine_collection='Doctrine'
christ_collection='Christ'
ifm_collection='Ifm'
med_collection='Mediator'
igf_collection='Igf'

def batch_data(iterable, n=1):
    l = len(iterable)
    for ndx in range(0, l, n):
        yield iterable[ndx:min(ndx + n, l)]

data=[]
headers=[]
with open(doc_file_path) as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    line_count = 0
    for row in csv_reader:
        if line_count == 0:
            for header in row:
                headers.append(header)
            line_count += 1
        else:
            obj = {}
            for idx, item in enumerate(row):
                obj[headers[idx]] = item
            data.append(obj)
            line_count += 1
    print(f'Processed {line_count} lines.')

for batched_data in batch_data(data, 499):
    batch = db.batch()
    for data_item in batched_data:
        doc_ref = db.collection(doctrine_collection).document()
        batch.set(doc_ref, data_item)
    batch.commit()

print('Done')