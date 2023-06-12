import React from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import UserForm from "@/components/StoreAdmin/User_Form";
import StoreForm from "@/components/StoreAdmin/Store_Form";

const Profile = () => {
  return (
    <>
    <div className="flex flex-col  justify-center items-center gap-8 m-5">
        <h1 className="text-4xl self-start text-[#3ba33b] font-semibold">
          Your Information
        </h1>
      <Tabs variant="soft-rounded" colorScheme="green">
        <TabList>
          <Tab fontSize={'lg'}>Edit Profile</Tab>
          <Tab fontSize={'lg'}>Edit Store</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <UserForm/>
          </TabPanel>
          <TabPanel>
            <StoreForm/>
          </TabPanel>
        </TabPanels>
      </Tabs>
      </div>
    </>
  );
};

export default Profile;
