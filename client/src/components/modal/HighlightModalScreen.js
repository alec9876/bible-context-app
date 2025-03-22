import React from 'react';
import { Text } from 'react-native';
import { Dialog } from '@rneui/themed';

const HighlightModalScreen = (props) => {
    const {visible, toggle, highlight, remove } = props;

    return(
        <Dialog
            isVisible={visible}
            onBackdropPress={toggle}>
            <Dialog.Title title="Delete Highlight?" />
            <Text>Do you want to delete this highlight from your profile?</Text>
            <Dialog.Actions>
                <Dialog.Button title="Yes" onPress={() => remove(highlight)} />
                <Dialog.Button title="No" onPress={toggle} />
            </Dialog.Actions>
        </Dialog>
    )
}

export default HighlightModalScreen;