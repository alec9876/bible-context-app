import firebase_admin
import data_funcs as df

from firebase_admin import credentials
from firebase_admin import firestore

cred = credentials.Certificate("/Users/AlecSchram/Projects/bible-context/firebase/serviceAccountKey.json")
firebase_admin.initialize_app(cred)

db=firestore.client()

g_ref = db.collection('Doctrine').document('DczvPkKtBExCzMNvpE3N').collection('SubDoctrine').document('Uh9mrbrOGNATERVFgxAA')

g_ref.set({
    u'Topic': u'Pre-existence',
    u'Reference': [
        {
            u'Topic':'Firstborn of All Creation', u'Verses':[u'John 1:1', u'Hebrews 1:10-12']
        }
        
    ]
})
