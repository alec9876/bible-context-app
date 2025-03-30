using Google.Cloud.Firestore;

namespace Application;

public class FirestoreContext
{
    private readonly FirestoreDb _firestoreDb;

    public FirestoreContext(FirestoreDb firestoreDb)
    {
        _firestoreDb = firestoreDb;
    }

    
}
