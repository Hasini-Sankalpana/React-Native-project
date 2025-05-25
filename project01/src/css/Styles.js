import { addItemStyles } from "./AddItemStyles";
import { detailStyles } from "./detailStyle";
import { homeStyles } from "./homeStyles";
import { settingStyles } from "./SettingStyles";
import { signinStyles } from "./signinStyles";
import { signupStyles } from "./signupStyles";

export const styles = {
    home: (theme) => homeStyles(theme),
    details: (theme) => detailStyles(theme),
    signin: (theme) => signinStyles(theme),
    signup: (theme) => signupStyles(theme),
    item: (theme) => addItemStyles(theme),
    settings: (theme) => settingStyles(theme)
}