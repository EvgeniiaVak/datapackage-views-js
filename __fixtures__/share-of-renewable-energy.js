import {DataView} from '../src/index'

const renewable = 1204.54, other = 1788.49;
const total = renewable + other;

const renewablePercentage = `${Math.round(renewable / total * 100)}%`
const otherPercentage = `${Math.round(other / total * 100)}%`

const dataFormat = {
  "type": "bar",
  "textposition": 'inside',
  "textangle": 0,
  "textfont": {
    "size": 22
  },
  "orientation": "h",
  "hoverinfo": "none",
}

const datapackage = {
  "views": [
    {
      "id": 1,
      "resources": [
        {
          "name": "share_of_renewables",
          "_values": [
            {
              "date": "2019-10-11",
              "renewalble": renewable,
              "other": other
            }
          ]
        },
      ],
      "specType": "plotly",
      "spec": {
        "group": "date",
        "series": [
          "renewalble",
          "other"
        ],
        "data": [
          Object.assign({
              "name": "renewable",
              "text": renewablePercentage
            }, dataFormat
          ),
          Object.assign({
              "name": "other",
              "text": otherPercentage
            }, dataFormat
          )
        ],
        "layout": {
          "title": "SHARE OF RENEWABLE ENERGY",
          "autosize": false,
          "width": 400,
          "height": 500,
          "margin": {
            "l": 10,
            "r": 10,
            "b": 10,
            "t": 40
          },
          "xaxis": {
            "ticks": 'outside',
            "zeroline": false,
          },
          "yaxis": {
            "ticks": "",
            "showgrid": false,
            "zeroline": false,
            "showticklabels": false,
          },
          "barmode": "stack",
          "colorway": ["#FBD236", "#008A8B"],
          "legend": {
            "font": {
              "size": 20,
            },
            "orientation": "h",
            "traceorder": "normal",
            "xanchor": "center",
            "x": 0.5
          }
        },
        "config": {
          "displayModeBar": false
        }
      }
    }
  ]
}

const loading = false

export default {
  component: DataView,
  props: {datapackage, loading}
};
