// Sample user data
const users = [
  { id: 1, name: 'ClimateWatcher', handle: '@climate_watch' },
  { id: 2, name: 'OceanDefender', handle: '@ocean_guardian' },
  { id: 3, name: 'EcoInnovator', handle: '@eco_solutions' },
  { id: 4, name: 'PolicyWatcher', handle: '@green_policy' },
  { id: 5, name: 'GreenpeaceIndia', handle: '@greenpeace_in' },
  { id: 6, name: 'UN Environment', handle: '@UNEP' },
];

// Sample posts data
const initialPosts = [
  {
    id: 1,
    user: 'ClimateWatcher',
    handle: '@climate_watch',
    content: 'Breaking: Air Quality Index in Delhi hits \'severe\' category at 412. Schools closed for the week. #AirPollution #DelhiSmog',
    timestamp: '2h ago',
    likes: 1245,
    comments: 87,
    reposts: 324,
    tags: ['@green_policy']
  },
  {
    id: 2,
    user: 'OceanDefender',
    handle: '@ocean_guardian',
    content: 'SPOTTED: Industrial waste being dumped into the Yamuna River. We\'ve documented evidence and reported to authorities! #WaterPollution',
    timestamp: '5h ago',
    likes: 2893,
    comments: 342,
    reposts: 1204,
    tags: ['@UNEP', '@greenpeace_in']
  },
  {
    id: 3,
    user: 'EcoInnovator',
    handle: '@eco_solutions',
    content: 'Amazing news! Our community cleanup collected over 2 tons of plastic from the beach today. Thanks to all 300+ volunteers! #PlasticFree',
    timestamp: '8h ago',
    likes: 952,
    comments: 45,
    reposts: 211,
    tags: []
  }
];

// Main App Component
const GasLitApp = () => {
  const [posts, setPosts] = React.useState(initialPosts);
  const [newPost, setNewPost] = React.useState('');
  const [charCount, setCharCount] = React.useState(0);
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [showTagMenu, setShowTagMenu] = React.useState(false);
  const [tagSearch, setTagSearch] = React.useState('');
  const [taggedUsers, setTaggedUsers] = React.useState([]);
  const [newPostAnimation, setNewPostAnimation] = React.useState(false);
  const MAX_CHARS = 160;

  const fileInputRef = React.useRef(null);
  const tagMenuRef = React.useRef(null);

  // Post content handling
  const handlePostChange = (e) => {
    const content = e.target.value;
    if (content.length <= MAX_CHARS) {
      setNewPost(content);
      setCharCount(content.length);
    }
  };

  // Image handling
  const handleImageSelect = () => {
    // In a prototype, we'll just simulate having an image
    setSelectedImage('https://via.placeholder.com/500x280?text=Environmental+Image');
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
  };

  // Tag handling
  const handleTagClick = () => {
    setShowTagMenu(!showTagMenu);
  };

  const handleTagSearch = (e) => {
    setTagSearch(e.target.value);
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(tagSearch.toLowerCase()) || 
    user.handle.toLowerCase().includes(tagSearch.toLowerCase())
  );

  const handleTagUser = (user) => {
    if (!taggedUsers.some(taggedUser => taggedUser.id === user.id)) {
      setTaggedUsers([...taggedUsers, user]);
    }
    setTagSearch('');
    setShowTagMenu(false);
  };

  const handleRemoveTag = (userId) => {
    setTaggedUsers(taggedUsers.filter(user => user.id !== userId));
  };

  // Post submission
  const handleSubmitPost = (e) => {
    e.preventDefault();
    if (newPost.trim() || selectedImage) {
      const post = {
        id: posts.length + 1,
        user: 'YourUsername',
        handle: '@your_handle',
        content: newPost,
        image: selectedImage,
        timestamp: 'Just now',
        likes: 0,
        comments: 0,
        reposts: 0,
        tags: taggedUsers.map(user => user.handle)
      };
      setPosts([post, ...posts]);
      setNewPost('');
      setCharCount(0);
      setSelectedImage(null);
      setTaggedUsers([]);
      setNewPostAnimation(true);
      
      setTimeout(() => {
        setNewPostAnimation(false);
      }, 500);
    }
  };

  // Format post content to highlight hashtags
  const formatPostContent = (content) => {
    const words = content.split(' ');
    return words.map((word, index) => {
      if (word.startsWith('#')) {
        return React.createElement('span', {
          key: index,
          className: 'text-green-600 font-medium'
        }, word + ' ');
      }
      return word + ' ';
    });
  };

  // Click outside handler for tag menu
  React.useEffect(() => {
    function handleClickOutside(event) {
      if (tagMenuRef.current && !tagMenuRef.current.contains(event.target)) {
        setShowTagMenu(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Left Sidebar */}
      <div className="w-1/4 p-4 bg-white border-r border-gray-200 hidden md:block">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-green-600">GasLit</h1>
        </div>
        
        <nav>
          <ul className="space-y-4">
            <li className="flex items-center space-x-3 p-2 rounded-full hover:bg-green-50 text-gray-800 font-semibold">
              <i data-lucide="home" className="w-6 h-6"></i>
              <span>Home</span>
            </li>
            <li className="flex items-center space-x-3 p-2 rounded-full hover:bg-green-50 text-gray-800">
              <i data-lucide="hash" className="w-6 h-6"></i>
              <span>Explore</span>
            </li>
            <li className="flex items-center space-x-3 p-2 rounded-full hover:bg-green-50 text-gray-800">
              <i data-lucide="bell" className="w-6 h-6"></i>
              <span>Notifications</span>
            </li>
            <li className="flex items-center space-x-3 p-2 rounded-full hover:bg-green-50 text-gray-800">
              <i data-lucide="message-circle" className="w-6 h-6"></i>
              <span>Messages</span>
            </li>
            <li className="flex items-center space-x-3 p-2 rounded-full hover:bg-green-50 text-gray-800">
              <i data-lucide="user" className="w-6 h-6"></i>
              <span>Profile</span>
            </li>
          </ul>
        </nav>
        
        <button className="mt-6 w-full bg-green-600 text-white font-bold py-3 rounded-full hover:bg-green-700 transition-all duration-200 hover-scale">
          Post
        </button>
      </div>
      
      {/* Main Content */}
      <div className="w-full md:w-2/4 border-r border-gray-200 bg-white">
        <div className="sticky top-0 z-10 bg-white p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold">Home</h2>
        </div>
        
        {/* Post Form */}
        <div className="p-4 border-b border-gray-200">
          <form onSubmit={handleSubmitPost}>
            <div className="flex">
              <div className="w-12 h-12 rounded-full mr-4 placeholder-image">You</div>
              <div className="w-full">
                <textarea 
                  className="w-full border border-gray-200 p-2 rounded-lg text-lg placeholder-gray-400 h-20 resize-none"
                  placeholder="What's happening with our environment today?"
                  value={newPost}
                  onChange={handlePostChange}
                />
                
                {/* Tagged users display */}
                {taggedUsers.length > 0 && (
                  <div className="flex flex-wrap mb-2">
                    {taggedUsers.map(user => (
                      <div key={user.id} className="flex items-center bg-green-50 rounded-full px-3 py-1 mr-2 mb-2">
                        <span className="text-green-800 text-sm">{user.handle}</span>
                        <button 
                          onClick={() => handleRemoveTag(user.id)}
                          className="ml-1 text-green-700 hover:text-green-900"
                        >
                          <i data-lucide="x" className="w-3 h-3"></i>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Selected image preview */}
                {selectedImage && (
                  <div className="relative mt-2 mb-2">
                    <img src={selectedImage} alt="Selected" className="rounded-xl max-h-60 w-auto" />
                    <button 
                      onClick={handleRemoveImage}
                      className="absolute top-2 right-2 bg-gray-800 bg-opacity-70 text-white rounded-full p-1"
                    >
                      <i data-lucide="x" className="w-4 h-4"></i>
                    </button>
                  </div>
                )}
                
                <div className="mt-2 flex justify-between items-center">
                  <div className="flex items-center space-x-4 text-green-500">
                    <button 
                      type="button" 
                      onClick={handleImageSelect}
                      className="hover:text-green-700 transition-colors duration-200"
                    >
                      <i data-lucide="image" className="w-5 h-5"></i>
                    </button>
                    
                    <div className="relative">
                      <button 
                        type="button" 
                        onClick={handleTagClick}
                        className="hover:text-green-700 transition-colors duration-200"
                      >
                        <i data-lucide="at-sign" className="w-5 h-5"></i>
                      </button>
                      
                      {/* Tag menu popup */}
                      {showTagMenu && (
                        <div ref={tagMenuRef} className="absolute left-0 top-6 w-64 bg-white shadow-lg rounded-lg z-20 border border-gray-200">
                          <div className="p-2">
                            <input
                              type="text"
                              placeholder="Search users to tag"
                              value={tagSearch}
                              onChange={handleTagSearch}
                              className="w-full p-2 border border-gray-200 rounded"
                            />
                          </div>
                          <ul className="max-h-48 overflow-y-auto">
                            {filteredUsers.map(user => (
                              <li 
                                key={user.id} 
                                className="p-2 hover:bg-gray-100 cursor-pointer flex items-center"
                                onClick={() => handleTagUser(user)}
                              >
                                <div className="w-8 h-8 rounded-full mr-2 placeholder-image">
                                  {user.name.charAt(0)}
                                </div>
                                <div>
                                  <p className="font-medium">{user.name}</p>
                                  <p className="text-sm text-gray-500">{user.handle}</p>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                    
                    <div className="text-sm text-gray-500">
                      <span className={charCount > MAX_CHARS - 20 ? "text-red-500" : ""}>
                        {charCount}/{MAX_CHARS}
                      </span>
                    </div>
                  </div>
                  <button 
                    type="submit"
                    className={`bg-green-500 text-white px-4 py-2 rounded-full font-bold hover:bg-green-600 transition-all duration-200 hover-scale ${
                      !newPost.trim() && !selectedImage ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    disabled={!newPost.trim() && !selectedImage}
                  >
                    Post
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
        
        {/* Feed */}
        <div>
          {posts.map((post, index) => (
            <div 
              key={post.id} 
              className={`p-4 border-b border-gray-200 hover:bg-gray-50 transition-all duration-200 ${
                index === 0 && newPostAnimation ? 'animate-fade-in' : ''
              }`}
            >
              <div className="flex">
                <div className="w-12 h-12 rounded-full mr-3 placeholder-image">
                  {post.user.charAt(0)}
                </div>
                <div className="w-full">
                  <div className="flex items-center">
                    <span className="font-bold mr-1">{post.user}</span>
                    <span className="text-gray-500 mr-1">{post.handle}</span>
                    <span className="text-gray-500">· {post.timestamp}</span>
                  </div>
                  
                  {/* Tagged users */}
                  {post.tags && post.tags.length > 0 && (
                    <div className="text-sm text-gray-600 mb-1">
                      Tagging: {post.tags.join(', ')}
                    </div>
                  )}
                  
                  <p className="mt-1 mb-2">{formatPostContent(post.content)}</p>
                  
                  {post.image && (
                    <div className="rounded-xl overflow-hidden mb-2 transition-all duration-200 hover:opacity-95">
                      <img 
                        src={post.image} 
                        alt="Post content" 
                        className="w-full transition-transform duration-300 hover:scale-105" 
                      />
                    </div>
                  )}
                  
                  <div className="flex justify-between mt-2 text-gray-500">
                    <button className="flex items-center space-x-1 hover:text-blue-500 transition-colors duration-200">
                      <i data-lucide="message-circle" className="w-4 h-4"></i>
                      <span>{post.comments}</span>
                    </button>
                    <button className="flex items-center space-x-1 hover:text-green-500 transition-colors duration-200">
                      <i data-lucide="repeat" className="w-4 h-4"></i>
                      <span>{post.reposts}</span>
                    </button>
                    <button className="flex items-center space-x-1 hover:text-red-500 transition-colors duration-200 hover-scale">
                      <i data-lucide="heart" className="w-4 h-4"></i>
                      <span>{post.likes}</span>
                    </button>
                    <button className="flex items-center space-x-1 hover:text-blue-500 transition-colors duration-200">
                      <i data-lucide="share-2" className="w-4 h-4"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Right Sidebar */}
      <div className="w-1/4 p-4 hidden lg:block">
        <div className="bg-gray-50 rounded-xl p-4 mb-4">
          <div className="relative">
            <i data-lucide="search" className="absolute left-3 top-3 text-gray-400"></i>
            <input 
              type="text" 
              placeholder="Search profiles" 
              className="w-full bg-gray-100 rounded-full py-2 pl-10 pr-4 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
            />
          </div>
        </div>
        
        <div className="bg-gray-50 rounded-xl p-4 mb-4 transition-all duration-300 hover:shadow-md">
          <h3 className="font-bold text-lg mb-3">Environmental Trends</h3>
          <ul className="space-y-3">
            <li className="transition-all duration-200 hover:translate-x-1">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-xs text-gray-500">Trending in World</span>
                  <p className="font-bold">#ClimateAction</p>
                  <span className="text-xs text-gray-500">125K posts</span>
                </div>
                <i data-lucide="bar-chart-2" className="w-4 h-4 text-green-500"></i>
              </div>
            </li>
            <li className="transition-all duration-200 hover:translate-x-1">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-xs text-gray-500">Trending in India</span>
                  <p className="font-bold">#AirQualityIndex</p>
                  <span className="text-xs text-gray-500">89.5K posts</span>
                </div>
                <i data-lucide="bar-chart-2" className="w-4 h-4 text-green-500"></i>
              </div>
            </li>
            <li className="transition-all duration-200 hover:translate-x-1">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-xs text-gray-500">Trending in Environment</span>
                  <p className="font-bold">#SaveYamuna</p>
                  <span className="text-xs text-gray-500">45.2K posts</span>
                </div>
                <i data-lucide="bar-chart-2" className="w-4 h-4 text-green-500"></i>
              </div>
            </li>
          </ul>
        </div>
        
        <div className="bg-gray-50 rounded-xl p-4 transition-all duration-300 hover:shadow-md">
          <h3 className="font-bold text-lg mb-3">Who to follow</h3>
          <ul className="space-y-4">
            <li className="flex justify-between items-center transition-all duration-200 hover:bg-green-50 p-2 rounded-lg">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full mr-3 placeholder-image">G</div>
                <div>
                  <p className="font-bold">GreenpeaceIndia</p>
                  <p className="text-gray-500 text-sm">@greenpeace_in</p>
                </div>
              </div>
              <button className="bg-black text-white rounded-full px-4 py-1 text-sm font-bold transition-all duration-200 hover:bg-green-600">
                Follow
              </button>
            </li>
            <li className="flex justify-between items-center transition-all duration-200 hover:bg-green-50 p-2 rounded-lg">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full mr-3 placeholder-image">U</div>
                <div>
                  <p className="font-bold">UN Environment</p>
                  <p className="text-gray-500 text-sm">@UNEP</p>
                </div>
              </div>
              <button className="bg-black text-white rounded-full px-4 py-1 text-sm font-bold transition-all duration-200 hover:bg-green-600">
                Follow
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

// Initialize Lucide icons after the component is mounted
React.useEffect(() => {
  lucide.createIcons();
}, []);

// Render the app
ReactDOM.render(<GasLitApp />, document.getElementById('app'));
