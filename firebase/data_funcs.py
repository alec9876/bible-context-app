

#Adds a new field to existing Sections collection
#New field adds the number of chapters per book
def add_field_section(db, colRef, bookName, chapterLength):
    for book in colRef:
        sections = db.collection('NewTestamentBooks').document(book.id).collection('Sections').get()
        for item in sections:
            newItem = item.to_dict()
            if newItem["BookName"] == bookName:
                addField = item.reference
                addField.set({ 'Length':chapterLength }, merge=True)
                print(item.to_dict())

#Adds new docs to collection BibleLegend
def add_legend_collection(db, color, genre, testament, description):
    data = {
        'Color':color,
        'Genre':genre,
        'Testament':testament,
        'Description':description
    }
    db.collection('BibleLegend').add(data)
