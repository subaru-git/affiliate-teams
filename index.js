'use strict';

const axios = require('axios');
const config = require('dotenv').config();
const fs = require('fs');

(async () => {
  const json = JSON.parse(fs.readFileSync('./data/data.json', 'utf8'));
  const content = json.data[Math.floor( Math.random() * json.data.length )];
  await axios.post(process.env.TEAMS_HOOK_URL, {
    type: 'message',
    attachments: [
      {
        contentType: 'application/vnd.microsoft.card.adaptive',
        contentUrl: null,
        content: {
          $schema: 'http://adaptivecards.io/schemas/adaptive-card.json',
          type: 'AdaptiveCard',
          version: '1.5',
          body: [
            {
              type: 'TextBlock',
              size: 'Medium',
              wight: 'Bolder',
              text: `[${content.title}](${content.url})`
            },
            {
              type: 'ColumnSet',
              columns: [
                {
                  type: 'Column',
                  width: 'stretch',
                  items: [
                    {
                      type: 'TextBlock',
                      wrap: true,
                      text: content.text,
                      color: 'Good',
                      size: 'Large',
                      isSubtle: true
                    },
                  ],
                  horizontalAlignment: 'Left',
                },
                {
                  type: 'Column',
                  width: 'auto',
                  items: [
                    {
                      type: 'Image',
                      selectAction: {
                        type: 'Action.OpenUrl',
                        url: content.url
                      },
                      altText: 'image',
                      url: content.image,
                      size: 'Large'
                    }
                  ],
                  style: 'default',
                  horizontalAlignment: 'Right',
                  spacing: 'Large'
                }
              ]
            }
          ],
          verticalContentAlignment: 'Bottom',
          msTeams: {
            width: 'Full'
          },
        }
      }
    ]
  })
})();
