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
// <a href="https://www.amazon.co.jp/Dictionary-Monolingual-American-dictionary-students-ebook/dp/B013UX62AA?_encoding=UTF8&qid=&sr=&linkCode=li2&tag=salagramer-22&linkId=2116cee88f97d6caac71da736d6625d7&language=ja_JP&ref_=as_li_ss_il" target="_blank"><img border="0" src="//ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B013UX62AA&Format=_SL160_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=salagramer-22&language=ja_JP" ></a><img src="https://ir-jp.amazon-adsystem.com/e/ir?t=salagramer-22&language=ja_JP&l=li2&o=9&a=B013UX62AA" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />