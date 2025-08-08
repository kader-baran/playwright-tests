import base from "@playwright/test";
import { PetApiPage } from "../model/PetApiPage";
import { StoreApiPage } from "../model/StoreApiPage";
import { UserApiPage } from "../model/UserApiPage";

type ApiPages = {
  petApi: PetApiPage;
  storeApi: StoreApiPage;
  userApi: UserApiPage;
};

const test = base.extend<ApiPages>({
  petApi: async ({ request }, use) => {
    await use(new PetApiPage(request));
  },
  storeApi: async ({ request }, use) => {
    await use(new StoreApiPage(request));
  },
  userApi: async ({ request }, use) => {
    await use(new UserApiPage(request));
  },
});

export default test;
export { expect } from "@playwright/test";
