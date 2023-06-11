import { createNativeStackNavigator } from '@react-navigation/native-stack';

import BibleScreen from '../src/components/BibleScreen';
import ChaptersScreen from '../src/components/ChaptersScreen';
import SectionsScreen from '../src/components/SectionsScreen';
import VerseScreen from '../src/components/VerseScreen';
import VerseSectionScreen from '../src/components/VerseSectionScreen';

import DoctrineScreen from '../src/components/DoctrineScreen';
import SubDoctrineScreen from '../src/components/SubDoctrineScreen';
import SubDoctrineDetailScreen from '../src/components/SubDoctrineDetailScreen';

//Bible Screen Navigation Stack
export const BibleStackScreen = () => {
    const BibleStack = createNativeStackNavigator();
    return(
        <BibleStack.Navigator>
            <BibleStack.Screen 
                name="BibleScreen" 
                component={BibleScreen} 
                options={({route}) => ({
                    headerShown: false,
                    headerTintColor: 'white'
            })} />
            <BibleStack.Screen 
                name="Chapters" 
                component={ChaptersScreen}
                options={({route}) => ({
                    title: route.params.name,
                    headerStyle: {
                        backgroundColor: '#333'
                    },
                    headerTintColor: 'white'
            })}  />
            <BibleStack.Screen 
                name="Sections" 
                component={SectionsScreen}
                options={({route}) => ({
                    title: route.params.name,
                    headerStyle: {
                        backgroundColor: '#333'
                    },
                    headerTintColor: 'white'
            })}  />
            <BibleStack.Screen 
                name="Scripture" 
                component={VerseScreen}
                options={({route}) => ({
                    title: route.params.name,
                    headerStyle: {
                        backgroundColor: '#333'
                    },
                    headerTintColor: 'white'
            })} />
            <BibleStack.Screen 
                name="Sections Scripture" 
                component={VerseSectionScreen}
                options={({route}) => ({
                    title: route.params.name,
                    headerStyle: {
                        backgroundColor: '#333'
                    },
                    headerTintColor: 'white'
            })} />
        </BibleStack.Navigator>
    );
}

// Doctine Screen Navigation Stack
export const DoctrineStackScreen = () => {
    const DoctrineStack = createNativeStackNavigator();
    return (
        <DoctrineStack.Navigator>
            <DoctrineStack.Screen
                name="DoctrineScreen" 
                component={DoctrineScreen} 
                options={({route}) => ({
                    headerShown: false,
                    headerTintColor: 'white'
            })}  />
            <DoctrineStack.Screen
                name="SubDoctrine" 
                component={SubDoctrineScreen} 
                options={({route}) => ({
                    title: route.params.name,
                    headerStyle: {
                        backgroundColor: '#333'
                    },
                    headerTintColor: 'white'
            })}  />
            <DoctrineStack.Screen
                name="SubDoctrineDetail"
                component={SubDoctrineDetailScreen}
                options={({route}) => ({
                    title: route.params.name,
                    headerStyle: {
                        backgroundColor: '#333'
                    },
                    headerTintColor: 'white'
            })} />
        </DoctrineStack.Navigator>
    )
}