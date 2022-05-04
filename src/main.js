import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import { Button } from 'vant';
import { Cell, CellGroup } from 'vant';
import { ConfigProvider } from 'vant';
import { Image as VanImage } from 'vant';
import { Icon } from 'vant';
import { Col, Row } from 'vant';
import { Popup } from 'vant';
import { Toast } from 'vant';
import { Calendar } from 'vant';
import { Cascader } from 'vant';
import { Checkbox, CheckboxGroup } from 'vant';
import { DatetimePicker } from 'vant';
import { Field } from 'vant';
import { Form } from 'vant';
import { NumberKeyboard } from 'vant';
import { PasswordInput } from 'vant';
import { Picker } from 'vant';
import { RadioGroup, Radio } from 'vant';
import { Uploader } from 'vant';
import { ActionSheet } from 'vant';
import { Dialog } from 'vant';
import { DropdownMenu, DropdownItem } from 'vant';
import { Loading } from 'vant';
import { Notify } from 'vant';
import { PullRefresh } from 'vant';
import { ShareSheet } from 'vant';
import { Collapse, CollapseItem } from 'vant';
import { Popover } from 'vant';
import { Step, Steps } from 'vant';
import { ActionBar, ActionBarIcon, ActionBarButton } from 'vant';
import { Grid, GridItem } from 'vant';
import { NavBar } from 'vant';
import { Tabbar, TabbarItem } from 'vant';
import { Tab, Tabs } from 'vant';
import { Card } from 'vant';
import { Tag } from 'vant';
import Vue3Transitions from 'vue3-transitions'
import axios from 'axios'
import { Locale } from 'vant';
import spanish from 'vant/es/locale/lang/es-ES';
Locale.use('es-ES', spanish);
const app = createApp(App);
app.use(Tab);
app.use(Tabs);
app.use(Tag);
app.use(router);
app.use(Button);
app.use(Cell);
app.use(CellGroup);
app.use(ConfigProvider);
app.use(Icon);
app.use(VanImage);
app.use(Col);
app.use(Row);
app.use(Popup);
app.use(Toast);
app.use(Calendar);
app.use(Cascader);
app.use(Checkbox);
app.use(CheckboxGroup);
app.use(DatetimePicker);
app.use(Field);
app.use(Form);
app.use(NumberKeyboard);
app.use(PasswordInput);
app.use(Picker);
app.use(Radio);
app.use(RadioGroup);
app.use(Uploader);
app.use(ActionSheet);
app.use(Dialog);
app.use(DropdownMenu);
app.use(DropdownItem);
app.use(Loading);
app.use(Notify);
app.use(PullRefresh);
app.use(ShareSheet);
app.use(Collapse);
app.use(CollapseItem);
app.use(Popover);
app.use(Step);
app.use(Steps);
app.use(ActionBar);
app.use(ActionBarIcon);
app.use(ActionBarButton);
app.use(Grid);
app.use(GridItem);
app.use(NavBar);
app.use(Tabbar);
app.use(TabbarItem);
app.use(Card);
app.use(Vue3Transitions);
import VueCookies from 'vue3-cookies';
app.use(VueCookies); 
fetch('/config.json')
    .then(res => res.json())
    .then(config => {
        if(process.env.NODE_ENV == "development")
            axios.defaults.baseURL = config.api_route_dev;
        else
            axios.defaults.baseURL = config.api_route_prod;
        app.config.globalProperties.$config = config;
        app.mount('#app');
})



