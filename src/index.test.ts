import test from 'ava'
import * as fs from 'fs'
import { select } from './index'


test('select', t => {
  const html = '<body><div></div><div id="rank">def<span>abc</span>123</div><div><section>toy<img class="my-image" src="hello" /> 123 </section></div></body>'

  const result = select(html, [
    '#rank',
    '.my-image'
  ])

  t.is(
    result,
    '<div id="rank">def<span>abc</span>123</div><img class="my-image" src="hello"></img>'
  )
})


test('select with complex selectors', t => {
  const html = `<div id="one" class="green">A</div><div id="one" class="blue"></div><span id="two" class="red"></span>`

  const result = select(html, [
    'div#one.green',
    'span.red'
  ])

  t.is(
    result,
    '<div id="one" class="green">A</div><span id="two" class="red"></span>'
  )
})


test('select performance', t => {
  const html = fs.readFileSync(__dirname + '/../fixtures/big.html', {encoding: 'utf8'})

  const selectors = [
    '#SalesRank',
    '#prodDetails',
    '#actualPriceValue',
    '#priceblock_ourprice',
    '#priceblock_saleprice',
    '#priceBlock',
    '#buyNewSection',
    '#priceblock_dealprice',
    '#prerderDelaySection',
    '#mocaSubtotal',
    '#tmmSwatches',
    '#mediaTab_content_landing',
    '#unqualifiedBuyBox',
    '#averageCustomerReviews',
    '.reviewCountTextLinkedHistogram',
    '#merchant-info',
    '#availability_feature_div',
    '#mocaBBSoldByAndShipsFrom',
    '#olp_feature_div',
    '#moreBuyingChoices_feature_div',
    '#usedbuyBox',
    'a.a-link-normal.contributorNameID',
    '.author',
    '#twister',
    '#gd-customizations-link',
    '#acrCustomerWriteReviewLink',
    '#acrCustomerReviewText',
    '#reviewLink',
    '.a-color-price',
    'ul.zg_hrsr',
    '.prodDetSectionEntry',
    '#regularprice_savings',
    '#regularprice_savings_value',
    '#askATFLink'
  ]

  const t0 = Date.now()

  for (let i = 0; i < 10; i++) {
    select(html, selectors)
  }

  const dt = Date.now() - t0

  t.is(
    dt < 400,
    true,
    `Expected to select in less than 400ms, but took ${dt}ms.`
  )

})