import React from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import UserForm from "@/components/StoreAdmin/User_Form";
import StoreForm from "@/components/StoreAdmin/Store_Form";
import {motion} from 'framer-motion'
const Profile = () => {
  return (
    <>
      <div className="flex flex-col  justify-center items-center gap-8 mx-20 my-5">
        <h1 className="text-3xl self-start px-5 py-3 bg-green-500 my-5 rounded-full text-white font-bold shadow-lg">
          Your Information
        </h1>
        <Tabs variant="soft-rounded" colorScheme="green">
          <TabList>
            <Tab fontSize={"lg"}>Edit Profile</Tab>
            <Tab fontSize={"lg"}>Edit Store</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <UserForm />
              </motion.div>
            </TabPanel>
            <TabPanel>
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <StoreForm />
              </motion.div>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </>
  );
};

export default Profile;
