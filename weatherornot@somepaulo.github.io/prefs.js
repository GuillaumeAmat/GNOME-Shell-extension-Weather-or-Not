import Gio from 'gi://Gio';
import Adw from 'gi://Adw';
import Gtk from 'gi://Gtk';

import {ExtensionPreferences, gettext as _} from 'resource:///org/gnome/Shell/Extensions/js/extensions/prefs.js';


export default class WeatherOrNotExtensionPreferences extends ExtensionPreferences {
    fillPreferencesWindow(prefsWindow) {
    
        // Create a preferences page, with a single group
        const prefsPage = new Adw.PreferencesPage({
            title: _('General'),
            icon_name: 'dialog-information-symbolic',
        });
        prefsWindow.add(prefsPage);

        const prefsGroup = new Adw.PreferencesGroup({
            title: _('Appearance'),
        });
        prefsPage.add(prefsGroup);

        // Create a list of options for the preferences row
        let positionSetting = new Gtk.StringList();
        positionSetting.append('Left', _('0'));
        positionSetting.append('Clock left', _('1'));
        positionSetting.append('Clock left centered', _('2'));
        positionSetting.append('Clock right centered', _('3'));
        positionSetting.append('Clock right', _('4'));
        positionSetting.append('Right', _('5'));
        
        // Create a preferences row
        window._settings = this.getSettings();
        const positionRow = new Adw.ComboRow({
            title: _('Position'),
            subtitle: _('Select where to show the weather indicator on the panel'),
            model: positionSetting,
            selected: window._settings.get_enum('position')
        });
        prefsGroup.add(positionRow);
        
        // Connect the preferences row to the `position` key
        positionRow.connect('notify::selected', (widget) => {
            window._settings.set_enum('position', widget.selected);
        });

    }
}

