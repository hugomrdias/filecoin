import {
  Box,
  Card,
  DataList,
  Flex,
  Heading,
  Link,
  Text,
} from '@radix-ui/themes'
import { resolve as doh } from 'iso-web/dnslink'
import { useEffect, useState } from 'react'
import * as Icons from './icons.jsx'

export function CardInfo() {
  const [cid, setCid] = /** @type {typeof useState<string>} */ (useState)()

  useEffect(() => {
    /**
     *
     */
    async function main() {
      try {
        if (
          window.location.host.includes('ipfs.dweb.link') ||
          window.location.host.includes('ipfs.w3s.link')
        ) {
          const cid = window.location.host.split('.')[0]
          setCid(cid)
          return
        }

        const dnsRecord1 = await doh(window.location.host)

        if (dnsRecord1.result) {
          setCid(dnsRecord1.result[0].replace('/ipfs/', ''))
        }
      } catch (error) {
        // noop
        console.error(error)
      }
    }

    main()
  }, [setCid])
  return (
    <Box>
      <Card>
        <Flex gap="1" p="1" direction="column">
          <Flex gap="2" align="center">
            <Icons.Info />
            <Heading size="3">Links</Heading>
          </Flex>
          <Flex mt="4" mb="4">
            <DataList.Root size="1">
              <DataList.Item align="center">
                <DataList.Label minWidth="88px">Docs</DataList.Label>
                <DataList.Value>
                  <Link
                    href="https://filecoin.hugomrdias.dev"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    filecoin.hugomrdias.dev
                  </Link>
                </DataList.Value>
              </DataList.Item>
              <DataList.Item>
                <DataList.Label minWidth="88px">Github</DataList.Label>
                <DataList.Value>
                  <Link
                    href="https://github.com/hugomrdias/filecoin"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    hugomrdias/filecoin
                  </Link>
                </DataList.Value>
              </DataList.Item>
              <DataList.Item>
                <DataList.Label minWidth="88px">CID</DataList.Label>
                <DataList.Value>
                  {cid ? (
                    <Link
                      href={`https://${cid}.ipfs.w3s.link/`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {cid || 'unknown'}
                    </Link>
                  ) : (
                    '...'
                  )}
                </DataList.Value>
              </DataList.Item>
              <DataList.Item>
                <DataList.Label minWidth="88px">Release Job</DataList.Label>
                <DataList.Value>
                  {import.meta.env.GITHUB_WORKFLOW_ID ? (
                    <Link
                      href={`https://github.com/hugomrdias/filecoin/actions/runs/${
                        import.meta.env.GITHUB_WORKFLOW_ID ?? ''
                      }`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {import.meta.env.GITHUB_WORKFLOW_ID || 'unknown'}
                    </Link>
                  ) : (
                    '...'
                  )}
                </DataList.Value>
              </DataList.Item>
              <DataList.Item>
                <DataList.Label minWidth="88px">Git</DataList.Label>
                <DataList.Value>
                  <code>
                    {import.meta.env.GIT_BRANCH}{' '}
                    <a
                      title="Commit hash"
                      target="_blank"
                      href={`https://github.com/hugomrdias/filecoin/commit/${
                        import.meta.env.GIT_COMMIT_HASH
                      }`}
                      rel="noreferrer"
                    >
                      {import.meta.env.GIT_COMMIT_HASH?.slice(0, 7)}
                    </a>{' '}
                    {import.meta.env.GIT_DATE}
                  </code>
                </DataList.Value>
              </DataList.Item>
            </DataList.Root>
          </Flex>
        </Flex>
      </Card>
    </Box>
  )
}
