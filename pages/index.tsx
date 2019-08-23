import React, { ReactElement } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { Button } from 'antd'
import { Button as MButton, Slider } from 'antd-mobile'
import Nav from '-/components/nav'
import { requestGetList, requestGetList500, requestGetListWithResponse } from '-/services/orderList'
import '../styles/global.scss'
import './styles.scss'

const Home = (): ReactElement => {
  const handleClick = async (): Promise<void> => {
    try {
      const res1 = await requestGetList({ page: 1, limit: 10 })
      const res2 = await requestGetListWithResponse({ page: 1, limit: 10 })
      console.warn(res1)
      console.warn(res2)
    } catch (err) {
      console.error(err)
    }
  }

  const handleClick500 = async (): Promise<void> => {
    try {
      const res = await requestGetList500()
      console.warn(res)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>

      <Nav />
      <div>
        <img src="/static/images/bg.png" alt="bg" />
      </div>
      <div className="hero">
        <h1 className="title">Welcome to Next.js!</h1>
        <p className="description">
          To get started, edit <code>pages/index.js</code> and save to reload.
        </p>
        <div className="row">
          <Link href="https://github.com/zeit/next.js#getting-started">
            <a className="card">
              <h3>Getting Started &rarr;</h3>
              <p>Learn more about Next.js on GitHub and in their examples</p>
            </a>
          </Link>
          <Link href="https://github.com/zeit/next.js/tree/master/examples">
            <a className="card">
              <h3>Examples &rarr;</h3>
              <p>Find other example boilerplates on the Next.js GitHub</p>
            </a>
          </Link>
          <Link href="https://github.com/zeit/next.js">
            <a className="card">
              <h3>Create Next App &rarr;</h3>
              <p>Was this tool helpful? Let us know how we can improve it!</p>
            </a>
          </Link>
        </div>
        <div style={{ width: '80%', margin: '10px auto', paddingBottom: '100px' }}>
          <Button onClick={handleClick}>确定</Button>
          <Button onClick={handleClick500}>确定500</Button>
          <MButton>取消</MButton>
          <Slider />
        </div>
      </div>
    </div>
  )
}

export default Home
