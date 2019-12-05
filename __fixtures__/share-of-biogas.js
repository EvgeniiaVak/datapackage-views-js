import {DataView} from '../src/index'

const datapackage = {
  "views": [
    {
      "id": 1,
      "resources": [
        {
          "name": "share-of-biogas",
          "values":[{
              "date": "2019-12-03",
              "KWh From Biogas": "9,027,967"
             }
            ]
        }
    ],
      "specType": "plotly",
      "spec": {
        "group": "date",
        "series": "KWh From Biogas",
        "data": [
          {"name": "KWh From Biogas",
           "type": "bar",
           "hovermode": "closest",
           "hoverlabel": {
               "bgcolor": "",
               "font": {
                   "size": 18,
                   "color": ""
               },
               "align": "left",
           }
        }
        ],
        "layout": {
          "title": "Share of Biogas",
          "height": 450,
          "xaxis": {
            "title": 'X Axis Title'
          },
          "yaxis": {
            "title": 'Y Axis Title'
          },
        //   "font": {
        //     "family": "\"Open Sans\", verdana, arial, sans-serif",
        //     "size": 12,
        //     "color": "rgb(169, 169, 169)"
        //   },
          "titlefont": {
            "family": "\"Open Sans\", verdana, arial, sans-serif",
            "size": 17,
            "color": "rgb(76, 76, 76)"
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
