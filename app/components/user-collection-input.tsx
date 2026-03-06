export default function UserCollectionInput() {
  return (
    <form>
      <fieldset className="border border-gray-300 p-6 pt-5 mb-4">
        <legend className="font-bold px-2">User Collection Input</legend>
        <label htmlFor="userName">Username:</label>
        <select id="userName" name="userName" className="border border-gray-300 py-1 px-2 ml-2 mr-10">
          <option value="user1">User 1</option>
          <option value="user2">User 2</option>
          <option value="user3">User 3</option>
        </select>
        <label htmlFor="mediaTitle">Media Title:</label>
        <select id="mediaTitle" name="mediaTitle" className="border border-gray-300 py-1 px-2 ml-2 mr-10">
          <option value="title1">title 1</option>
          <option value="title2">title 2</option>
          <option value="title3">title 3</option>
        </select>
        <label htmlFor="mediaType">Media Type:</label>
        <select id="mediaType" name="mediaType" className="border border-gray-300 py-1 px-2 ml-2 mr-10">
          <option value="mediaType1">Type 1</option>
          <option value="mediaType2">Type 2</option>
          <option value="mediaType3">Type 3</option>
        </select>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-4 border border-blue-700 rounded">
          Submit
        </button>
      </fieldset>
    </form>
  )
}
