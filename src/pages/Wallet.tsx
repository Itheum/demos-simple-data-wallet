import React, { useEffect, useState } from "react";
import { useGetAccount, useGetPendingTransactions } from "@multiversx/sdk-dapp/hooks";
import { DataNft } from "@itheum/sdk-mx-data-nft/out";
import { DataNftCards } from "../components/DataNftCards";
import { Checkbox } from "../libComponents/Checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../libComponents/Table";

export const Wallet: React.FC = () => {
  const { address } = useGetAccount();
  const { hasPendingTransactions } = useGetPendingTransactions();
  const [dataNfts, setDataNfts] = useState<DataNft[]>([]);
  const [isCards, setIsCards] = useState<boolean>(true);
  const [isTable, setIsTable] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);

      const _dataNfts = await DataNft.ownedByAddress(address);
      console.log(_dataNfts);
      setDataNfts(_dataNfts);

      setIsLoading(false);
    }
    if (!hasPendingTransactions) {
      fetchData();
    }
  }, [hasPendingTransactions]);

  return (
    <div className="flex flex-col justify-between gap-4 w-full mx-auto">
      <div className="text-center text-4xl pb-6">Your Data NFT's</div>
      <span className="text-lg text-center">Choose how to view data</span>

      <div className="flex justify-center items-center space-x-4">
        <Checkbox
          id="cards"
          checked={isCards}
          className="border-slate-300"
          onClick={() => {
            setIsCards(!isCards);
            setIsTable(!isTable);
          }}
        />
        <label
          htmlFor="cards"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Cards
        </label>
        <Checkbox
          id="table"
          checked={isTable}
          className="border-slate-300"
          onClick={() => {
            setIsCards(!isCards);
            setIsTable(!isTable);
          }}
        />
        <label
          htmlFor="table"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Table
        </label>
      </div>
      {isCards ? (
        <div className="grid base:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
          {dataNfts &&
            dataNfts.map((data, index) => {
              return (
                <div className="flex flex-row justify-center items-center">
                  <DataNftCards dataNft={data} key={index} />
                </div>
              );
            })}
        </div>
      ) : (
        <Table className="backdrop-blur border rounded-lg">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[6rem]">Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Token identifier</TableHead>
              <TableHead className="text-right">Creator</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dataNfts &&
              dataNfts.map((data, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      <img src={`${data.nftImgUrl}`} alt="nftImage" />
                    </TableCell>
                    <TableCell>{data.title}</TableCell>
                    <TableCell>{data.description}</TableCell>
                    <TableCell>{data.tokenIdentifier}</TableCell>
                    <TableCell>{`${data.creator.substring(0, 5)}...${data.creator.substring(
                      data.creator.length,
                      data.creator.length - 5
                    )}`}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      )}
    </div>
  );
};
