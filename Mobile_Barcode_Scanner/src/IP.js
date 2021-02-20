import { Button, Text, View } from "react-native";
import { NativeRouter, Switch, Route } from "react-router-native";

export default function IP(){
    return(
        <NativeRouter>
            <View >
                <Text style={styles}>Oi</Text>
                <Switch>
                    <Button onClick={() => navigate('/App')}>Pressione aqui para escanear</Button>
                    <Route exact path = "/App" component = {App}/>
                </Switch>
            </View>
        </NativeRouter>
    )
}