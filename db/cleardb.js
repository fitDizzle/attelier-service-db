const clearDB = async () => {
  await db.dropCollection('products');
  console.log('collection droppped');
};

export clearDB;