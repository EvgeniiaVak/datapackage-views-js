import {DataView} from '../src/index'

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
              "renewalble": 1204.54,
              "other": 1788.49
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
          {
            "name": "renewable",
            "type": "bar",
            "text": ["some text"],
            "orientation": "h",
            "hovermode": "closest",
            "hoverlabel": {
              "bgcolor": "#08505D",
              "font": {
                "size": 20,
                "color": "#FBD236"
              },
              "align": "left",
            }
          },
          {
            "name": "other",
            "type": "bar",
            "orientation": "h"
          }
        ],
        "layout": {
          "title": "SHARE OF RENEWABLE ENERGY",
          autosize: false,
          width: 500,
          height: 500,
          margin: {
            l: 10,
            r: 10,
            b: 10,
            t: 40,
            // pad: 1
          },
          // automargin: true,
          "xaxis": {
            // "title": 'X Axis Title',
            "ticks": "",
            // "showline": false,
            "showgrid": false,
            "zeroline": false,
            "showticklabels": false,
          },
          "yaxis": {
            // "title": 'Y Axis Title',
            "ticks": "",
            // "showline": false,
            "showgrid": false,
            "zeroline": false,
            "showticklabels": false,
          },
          "barmode": "stack",
          "colorway": ["#FBD236", "#08505D", "#008A8B"],
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
