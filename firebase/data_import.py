
import firebase_admin
import data_funcs as df

from firebase_admin import credentials
from firebase_admin import firestore

cred = credentials.Certificate("/Users/AlecSchram/Projects/bible-context/firebase/serviceAccountKey.json")
firebase_admin.initialize_app(cred)

db=firestore.client()

# otRef = db.collection('OldTestamentBooks').get()
# ntRef = db.collection('NewTestamentBooks').get()


docRef = db.collection('Doctrine').document('LaGtiTFNlv0xWc2EkO0W')
jcRef = docRef.collection('Christ').document('ZlR50cJCNum7LKaqnaRK')
pcDocRef = jcRef.collection('Igf').document('aSXLDMve6oisrUC1qWps')
pcDocRef.update({u'Verses': firestore.ArrayUnion([{u'Topic':'Fullness of Deity', u'Verses':['Colossians 1:19', 'Colossians 2:9']}, {u'Topic':'God and Savior Jesus Christ', u'Verses':'Titus 2:13'}])})

hu = pcDocRef.get()
print(f'Done.  Result: {hu.to_dict()}')



# functions that have been called
#add_field_section('Matthew', 28)