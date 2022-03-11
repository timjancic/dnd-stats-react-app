import React, { Component } from 'react';
import Plot from "react-plotly.js";

const abilities = ["Strength","Dexterity","Constitution","Intelligence","Wisdom","Charisma","Str-Save","Dex-Save","Con-Save","Int-Save","Wis-Save","Cha-Save"];

class AbilitiesUsedPlot extends Component {
  shouldComponentUpdate(nextProps) {
     // Rendering the component only if
     // passed props value is changed
     if (nextProps.pcNames !== this.props.pcNames) {
       console.log("AbilitiesUsedPlot Rendered");
       return true;
     } else {
       return false;
     }
  }

  render() {
    return (
      <React.Fragment>
        <Plot
          data={this.createTraces()}
          layout={{
            width: 800,
            height: 400,
            title: "Abilities and saving throws used",
            barmode: "stack",
            yaxis: {
              title: {
                text: "sum of times ability was used"
              }
            },
            xaxis: {
              tickvals: abilities
            }
          }}
        />
      </React.Fragment>
    );
  }

  createTraces() {
    let data = [];

    for (let i = 0; i < this.props.pcNames.length; i++) {
      data.push({
        x: abilities,
        y: this.props.pcStats[i].meta.nAbilityArray.concat(this.props.pcStats[i].meta.nSaveArray), //combine abilities and saves into one array
        name: this.props.pcNames[i],
        type: "bar"
      });
    }

    return data;
  }
}

export default AbilitiesUsedPlot;
