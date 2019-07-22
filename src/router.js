// router.js
import { StackNavigator } from "react-navigation";
import LoginForm from '../src/components/LoginForm';
import AlbumList from '../src/components/AlbumList';

export const LoginFlow = StackNavigator({
    LoginForm: {
        screen: LoginForm
    },
    AlbumList: {
        screen: AlbumList
    }
});
