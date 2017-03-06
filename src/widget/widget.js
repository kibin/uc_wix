import React from 'react'
import Wix from 'Wix'
import _ from 'lodash'

export default class widget extends React.Component {
  state = {
    settings: {
      buttonText: 'Choose files',
    },
    status: 'ready',
  }

  componentDidMount() {
    // this.updateCompHeight(600)
    Wix.addEventListener(Wix.Events.SETTINGS_UPDATED, this.onSettingsUpdate)
  }

  onSettingsUpdate = update => {
    this.setState({
      settings: {
        ...this.state.settings,
        [update.key]: update.value,
      }
    }) //, this.updateCompHeight)
  }

  updateCompHeight = height => {
    const desiredHeight = height || document.documentElement.scrollHeight
    Wix.setHeight(desiredHeight)
  }

  handleUpload = () => {
    const {publicKey} = this.state.settings

    this.setState({uuid: null})

    uploadcare
      .openDialog(null, {imagesOnly: true, publicKey})
      .then(res => {
        this.setState({status: 'uploading'})

        return res.promise()
      })
      .then(({uuid, cdnUrl}) => {
        const {handleChange} = this.props

        this.setState({status: 'done', uuid})
      }, reason => {
        console.log(reason)
        if (reason) this.setState({status: 'error'})
      })
  }

  render() {
    const {settings, uuid, status} = this.state
    const width = _.get(settings, ['buttonWidth'], 'auto')
    const height = _.get(settings, ['buttonHeight'], 'auto')

    return (
      <div>
        {settings.publicKey ? (
          <button
            className="button"
            onClick={this.handleUpload}
            style={{
              color: _.get(settings, ['buttonFontAndColor', 'color'], null),
              font: _.get(settings, ['buttonFontAndColor', 'font'], null),
              background: _.get(settings, ['buttonBackground', 'color'], null),
              width: `${width}${Number(width) ? 'px' : ''}`,
              height: `${height}${Number(height) ? 'px' : ''}`,
            }}
          >
            {settings.buttonText}
          </button>
        ) : (
          <p>Please go to settings and enter public key</p>
        )}
        <p>{status}</p>
        {uuid && <p>Uploaded!</p>}
        {uuid && <img width="180" height="180" src={`https://ucarecdn.com/${uuid}/-/preview/180x180/`} />}
      </div>
    )
  }
}
