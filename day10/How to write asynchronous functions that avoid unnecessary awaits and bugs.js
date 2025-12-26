// This is a wrong way to desigm asynchronous,ex1
function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function run() {
  const a = await wait(1000);
  const b = await wait(1000);
  console.log("done");
}

run();

//parallel writing,ex2
async function run() {
  const p1 = wait(1000);
  const p2 = wait(1000);

  await p1;
  await p2;

  console.log("done");
}
//or 
async function run() {
  await Promise.all([
    wait(1000),
    wait(1000)
  ]);

  console.log("done");
}

// Beginner's Writing Style (Slow)
const user = await fetchUser();
const posts = await fetchPosts();
const comments = await fetchComments();

// Engineers' writing style (quick)
const [user2, posts2, comments2] = await Promise.all([
  fetchUser(),
  fetchPosts(),
  fetchComments()
]);
