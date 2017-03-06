import UI from 'editor-ui-lib'
import React from 'react'
import _ from 'lodash'

export default class Design extends React.Component {
  state = {
    fontAndColor: {},
  }

  updateFontAndColor = newVal => {
    const {fontAndColor} = this.state
    const {onUpdate} = this.props
    const newFontAndColor = _.merge(
      {},
      fontAndColor,
      newVal.value
        ?  _.zipObject(...newVal.value.replace(';', '').split(':').map(a => [a]))
        : newVal
    )

    this.setState({fontAndColor: newFontAndColor})
    onUpdate('buttonFontAndColor', newFontAndColor)
  }

  render() {
    return (
      <div>
        <hr className="divider-long"/>
        <UI.sectionDividerLabeled label="Button Settings"/>
        <hr className="divider-long"/>

        <UI.textInput
          title="text"
          placeholder="Name your button"
          defaultText="Choose files"
          onChange={newVal => this.props.onUpdate('buttonText', newVal)}
        />

        <hr className="divider-long"/>

        <UI.fontAndColorPicker
          title="font and color"
          wix-param-font="buttonFont"
          wix-param-color="buttonTextColor"
          startWithColor="color-1"
          startWithTheme="font_8"
          onChange={this.updateFontAndColor}
        />

        <hr className="divider-long"/>

        <UI.colorPickerInput
          title="background"
          wix-param="buttonBackground"
          startWithColor="color-1"
          onChange={newVal => this.props.onUpdate('buttonBackground', newVal)}
        />

        <hr className="divider-long"/>

        <UI.textInput
          title="width"
          placeholder="in pixels"
          defaultText=""
          validator={val => val === '' || (!!val && !isNaN(val))}
          invalidMessage="Value should be a number or empty string"
          onChange={newVal => this.props.onUpdate('buttonWidth', newVal)}
        />

        <hr className="divider-long"/>

        <UI.textInput
          title="height"
          placeholder="in pixels"
          defaultText=""
          validator={val => val === '' || (!!val && !isNaN(val))}
          invalidMessage="Value should be a number or empty string"
          onChange={newVal => this.props.onUpdate('buttonHeight', newVal)}
        />
      </div>
    )
  }
}
