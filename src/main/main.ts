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

	if (process.env['NODE_ENV'] === 'development') {
		window.loadURL(`http://localhost:${process.env['VITE_PORT']}`)
	} else {
		window.loadFile(path.join(`${app.getAppPath()}/build-react/index.html`))
	}
})
