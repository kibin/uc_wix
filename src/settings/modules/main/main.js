import UI from 'editor-ui-lib';
import React from 'react'

export default class Main extends React.Component {
  onClick () {
    console.log('This is your call-to-action, take it seriously');
  }

  render () {
    return (
      <div className="main-tab">
        <img className="app-logo" src="https://d2hfuis4qoies5.cloudfront.net/80x80/1463191143233068515847_uploadcare-min.png" alt="app logo"/>
        <p className="app-description">
          Beautiful application to upload files and store them securely in the cloud.
          <br/>
          We handle your uploads so you don’t have to!
        </p>
        {false && <UI.button className="btn-confirm-primary" label="Main CTA" onClick={this.onClick}/>}
      </div>
    )
  }
}
