import React from 'react'
import Wix from 'Wix'
import UI from 'editor-ui-lib'

export default class widget extends React.Component {
  state = {
    settings: {},
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

    return (
      <div>
        {settings.publicKey ? (
          <UI.button label="Choose files" onClick={this.handleUpload} />
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
