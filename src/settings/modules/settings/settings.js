import UI from 'editor-ui-lib';
import React from 'react'

export default class Settings extends React.Component {
  render () {
    return (
      <div>
        <UI.textInput
          title="Public Key"
          placeholder="Grab your free API key at https://uploadcare.com/"
          onChange={(newVal)=>this.props.onUpdate('publicKey', newVal)}/>
      </div>
    )
  }
}
