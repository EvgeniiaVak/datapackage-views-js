import { DataView } from '../src/index'

const nowDate = new Date(new Date(new Date().setMinutes(0)).setSeconds(0,0)).toISOString();
// const apiUrl = '/proxy/api/datastore_search_sql';
const apiUrl = 'https://www.energidataservice.dk/api/3/action/datastore_search_sql';
// Get the latest 576 rows for co2 emission data because:
// * data granularity is 5 minutes
// * we have 2 regions (DK1 and DK2)
// * we need latest 24h
// = 24*60/5*2 = 576
const co2emisUrl = apiUrl + `?sql=SELECT * from "co2emisprog" WHERE "Minutes5UTC" > '${nowDate}' LIMIT 576`;
const datapackage =
  fetch(co2emisUrl)
  .then(response => {
    if (response.ok) {
      response.json().then(responseJson => {
        var resource = {
          name: 'co2emis',
          format: 'csv',
          _values: responseJson.result.records
        }
        var props = {
          datapackage: {
            views: [
              {
                specType: 'vega',
                resources: [resource],
                spec: {
                  "$schema": "https://vega.github.io/schema/vega/v4.json",
                  "width": 520,
                  "height": 260,
                  "padding": 10,
                  "title": {
                    "text": "CO2 Emission (values are g/kWh)",
                    "orient":"top",
                    "anchor": "start",
                    "color": "#008A8B",
                    "fontSize": 14,
                    "fontWeight": 300
                  },
                  "signals": [
                    {
                      "name": "tooltip",
                      "value": {},
                      "on": [
                        {"events": "rect:mouseover", "update": "datum"},
                        {"events": "rect:mouseout",  "update": "{}"}
                      ]
                    }
                  ],

                  "scales": [
                    {
                      "name": "xscale",
                      "type": "band",
                      "domain": {
                        "data": "co2emis",
                        "field": "Minutes5DK"
                      },
                      "range": "width",
                      "padding": 0.5
                    },
                    {
                      "name": "yscale",
                      "domain": {
                        "data": "co2emis",
                        "field": "CO2Emission"
                      },
                      "nice": true,
                      "range": "height"
                    }
                  ],
                  "axes": [
                    {
                      "orient": "bottom",
                      "scale": "xscale",
                      "ticks": false,
                      "domain": false,
                      "encode": {
                        "labels": {
                          "update": {
                            "text": {
                              "signal": "hours(datetime(datum.value)) + ':00'"
                            },
                            "fill": {
                              "value": "#008A8B"
                            },
                            "fontSize": {
                              "value": 10
                            },
                            "fontWeight": {
                              "value": "100"
                            },
                            "baseline": {
                              "value": "middle"
                            },
                            "dx": {
                              "value": 2
                            },
                            "dy": {
                              "value": 10
                            }
                          }
                        }
                      }
                    }
                  ],

                  "marks": [
                    {
                      "type": "rect",
                      "from": {"data":"co2emis"},
                      "encode": {
                        "enter": {
                          "x": {"scale": "xscale", "field": "Minutes5DK"},
                          "width": {"scale": "xscale", "band": 1},
                          "y": {"scale": "yscale", "field": "CO2Emission"},
                          "y2": {"scale": "yscale", "value": 0}
                        },
                        "update": {
                          "fill": [
                            {"test": "datum.id === 1", "value": "#fbd33c"},
                            {"value": "#008A8B"}
                          ]
                        },
                        "hover": {
                          "fill": {"value": "red"}
                        }
                      }
                    },
                    {
                      "type": "text",
                      "clip": true,
                      "encode": {
                        "enter": {
                          "align": {"value": "center"},
                          "baseline": {"value": "bottom"},
                          "fill": {"value": "#333"}
                        },
                        "update": {
                          "x": {"scale": "xscale", "signal": "tooltip.Minutes5DK", "band": 0.5},
                          "y": {"scale": "yscale", "signal": "tooltip.CO2Emission", "offset": -2},
                          "text": {"signal": "tooltip.id"},
                          "fillOpacity": [
                            {"test": "datum === tooltip", "value": 0},
                            {"value": 1}
                          ]
                        }
                      }
                    }
                  ],

                  "data": [
                    {
                      "name": "co2emis",
                      "transform": [
                        {"type":"filter", "expr":"minutes(datum.Minutes5UTC) === 0"},
                        {"type":"filter", "expr":"now() < datetime(datum.Minutes5UTC)"},
                        {"type": "identifier", "as": "id"}
                      ]
                    }
                  ]
                }
              }
            ]
          }
        }
        const domContainer = document.querySelector('#quick-fact-0');

        ReactDOM.render(<DatapackageView {...props} />, domContainer);
      }).catch(err => {
        console.error(err)
      })
    }
  })
  .resolve()

const loading = false

export default {
  component: DataView,
  props: {datapackage, loading}
};
