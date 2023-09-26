import sys
import requests
import re


API_KEY = 'd2e026fccb93d54531453f47ca54f44bbb71c102'
API_URL = 'https://api.esv.org/v3/passage/text/'


def get_esv_text(passage):
    params = {
        'q': passage,
        'include-headings': True,
        'include-heading-horizontal-lines':True,
        'include-footnotes': False,
        'include-verse-numbers': True,
        'include-short-copyright': False,
        'include-passage-references': False
    }

    headers = {
        'Authorization': 'Token %s' % API_KEY
    }

    response = requests.get(API_URL, params=params, headers=headers)

    passages = response.json()['passages']

    return re.search("_[\r\n]+([^\r\n]+)", passages[0]) if passages else 'Error: Passage not found'


print(get_esv_text('Matthew 1'))