import {
	app, BrowserWindow,
} from 'electron'
import path from 'path'

app.on('ready', () => {
	const window = new BrowserWindow({
		width:          800,
		height:         600,
		webPreferences: {
			nodeIntegration: true,
		},
	})

	window.loadFile(path.join(`${app.getAppPath()}/build-react/index.html`))
})
