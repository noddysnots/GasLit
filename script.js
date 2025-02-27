// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    lucide.createIcons();
    
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
            image: 'https://via.placeholder.com/500x280?text=Delhi+Smog',
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
            image: 'https://via.placeholder.com/500x280?text=River+Pollution',
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
    
    // DOM Elements
    const postForm = document.getElementById('post-form');
    const postContent = document.getElementById('post-content');
    const charCounter = document.getElementById('char-counter');
    const submitPost = document.getElementById('submit-post');
    const postFeed = document.getElementById('post-feed');
    const imageBtn = document.getElementById('image-btn');
    const imagePreview = document.getElementById('image-preview');
    const removeImageBtn = document.getElementById('remove-image');
    const tagBtn = document.getElementById('tag-btn');
    const tagMenu = document.getElementById('tag-menu');
    const tagSearch = document.getElementById('tag-search');
    const tagResults = document.getElementById('tag-results');
    const taggedUsers = document.getElementById('tagged-users');
    
    // App State
    let selectedImage = null;
    let selectedTags = [];
    
    // Initialize the feed
    function initializeFeed() {
        initialPosts.forEach(post => {
            renderPost(post, true);
        });
    }
    
    // Render a post in the feed
    function renderPost(post, append = false) {
        const postElement = document.createElement('div');
        postElement.className = `p-4 border-b border-gray-200 hover:bg-gray-50 transition-all duration-200 ${!append ? 'animate-fade-in' : ''}`;
        
        // Format post content (highlight hashtags)
        const formattedContent = post.content.replace(/#(\w+)/g, '<span class="hashtag">#$1</span>');
        
        // Tags display HTML
        let tagsHTML = '';
        if (post.tags && post.tags.length > 0) {
            tagsHTML = `
                <div class="text-sm text-gray-600 mb-1">
                    Tagging: ${post.tags.join(', ')}
                </div>
            `;
        }
        
        // Image HTML
        let imageHTML = '';
        if (post.image) {
            imageHTML = `
                <div class="rounded-xl overflow-hidden mb-2 transition-all duration-200 hover:opacity-95">
                    <img 
                        src="${post.image}" 
                        alt="Post content" 
                        class="w-full transition-transform duration-300 hover:scale-105" 
                    />
                </div>
            `;
        }
        
        // Post HTML structure
        postElement.innerHTML = `
            <div class="flex">
                <div class="w-12 h-12 rounded-full mr-3 bg-gray-300 flex items-center justify-center text-gray-600">
                    ${post.user.charAt(0)}
                </div>
                <div class="w-full">
                    <div class="flex items-center">
                        <span class="font-bold mr-1">${post.user}</span>
                        <span class="text-gray-500 mr-1">${post.handle}</span>
                        <span class="text-gray-500">· ${post.timestamp}</span>
                    </div>
                    
                    ${tagsHTML}
                    
                    <p class="mt-1 mb-2">${formattedContent}</p>
                    
                    ${imageHTML}
                    
                    <div class="flex justify-between mt-2 text-gray-500">
                        <button class="flex items-center space-x-1 hover:text-blue-500 transition-colors duration-200">
                            <i data-lucide="message-circle" class="w-4 h-4"></i>
                            <span>${post.comments}</span>
                        </button>
                        <button class="flex items-center space-x-1 hover:text-green-500 transition-colors duration-200">
                            <i data-lucide="repeat" class="w-4 h-4"></i>
                            <span>${post.reposts}</span>
                        </button>
                        <button class="flex items-center space-x-1 hover:text-red-500 transition-colors duration-200 hover-scale">
                            <i data-lucide="heart" class="w-4 h-4"></i>
                            <span>${post.likes}</span>
                        </button>
                        <button class="flex items-center space-x-1 hover:text-blue-500 transition-colors duration-200">
                            <i data-lucide="share-2" class="w-4 h-4"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        // Add to feed (prepend for new posts, append for initial load)
        if (append) {
            postFeed.appendChild(postElement);
        } else {
            postFeed.insertBefore(postElement, postFeed.firstChild);
        }
        
        // Re-initialize icons in the new post
        lucide.createIcons({
            icons: {
                'message-circle': true,
                'repeat': true,
                'heart': true,
                'share-2': true
            },
            root: postElement
        });
    }
    
    // Character counter
    postContent.addEventListener('input', function() {
        const count = this.value.length;
        charCounter.textContent = `${count}/160`;
        
        // Change color when approaching limit
        if (count > 140) {
            charCounter.classList.add('text-red-500');
        } else {
            charCounter.classList.remove('text-red-500');
        }
        
        // Enable/disable submit button
        if (count > 0 || selectedImage) {
            submitPost.classList.remove('opacity-50', 'cursor-not-allowed');
            submitPost.disabled = false;
        } else {
            submitPost.classList.add('opacity-50', 'cursor-not-allowed');
            submitPost.disabled = true;
        }
    });
    
    // Image selection
    imageBtn.addEventListener('click', function() {
        // For demo purposes, we'll just simulate having an image
        selectedImage = 'https://via.placeholder.com/500x280?text=Environmental+Image';
        
        // Show image preview
        const img = imagePreview.querySelector('img');
        img.src = selectedImage;
        imagePreview.classList.remove('hidden');
        
        // Enable submit button if needed
        if (!submitPost.disabled) return;
        if (selectedImage) {
            submitPost.classList.remove('opacity-50', 'cursor-not-allowed');
            submitPost.disabled = false;
        }
    });
    
    // Remove image
    removeImageBtn.addEventListener('click', function() {
        selectedImage = null;
        imagePreview.classList.add('hidden');
        
        // Disable submit button if needed
        if (postContent.value.length === 0) {
            submitPost.classList.add('opacity-50', 'cursor-not-allowed');
            submitPost.disabled = true;
        }
    });
    
    // Tag menu toggle
    tagBtn.addEventListener('click', function() {
        tagMenu.classList.toggle('hidden');
        populateTagResults(users);
    });
    
    // Close tag menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!tagBtn.contains(event.target) && !tagMenu.contains(event.target)) {
            tagMenu.classList.add('hidden');
        }
    });
    
    // Tag search
    tagSearch.addEventListener('input', function() {
        const query = this.value.toLowerCase();
        const filtered = users.filter(user => 
            user.name.toLowerCase().includes(query) || 
            user.handle.toLowerCase().includes(query)
        );
        populateTagResults(filtered);
    });
    
    // Populate tag results
    function populateTagResults(usersList) {
        tagResults.innerHTML = '';
        
        usersList.forEach(user => {
            // Skip if already tagged
            if (selectedTags.some(tag => tag.id === user.id)) return;
            
            const li = document.createElement('li');
            li.className = 'p-2 hover:bg-gray-100 cursor-pointer flex items-center';
            li.innerHTML = `
                <div class="w-8 h-8 rounded-full mr-2 bg-gray-300 flex items-center justify-center text-gray-600">
                    ${user.name.charAt(0)}
                </div>
                <div>
                    <p class="font-medium">${user.name}</p>
                    <p class="text-sm text-gray-500">${user.handle}</p>
                </div>
            `;
            
            li.addEventListener('click', function() {
                addTag(user);
                tagMenu.classList.add('hidden');
                tagSearch.value = '';
            });
            
            tagResults.appendChild(li);
        });
        
        if (usersList.length === 0) {
            tagResults.innerHTML = '<li class="p-3 text-center text-gray-500">No users found</li>';
        }
    }
    
    // Add a tag
    function addTag(user) {
        selectedTags.push(user);
        renderTags();
    }
    
    // Remove a tag
    function removeTag(userId) {
        selectedTags = selectedTags.filter(tag => tag.id !== userId);
        renderTags();
    }
    
    // Render tags
    function renderTags() {
        if (selectedTags.length === 0) {
            taggedUsers.classList.add('hidden');
            return;
        }
        
        taggedUsers.innerHTML = '';
        taggedUsers.classList.remove('hidden');
        
        selectedTags.forEach(user => {
            const tag = document.createElement('div');
            tag.className = 'flex items-center bg-green-50 rounded-full px-3 py-1 mr-2 mb-2';
            tag.innerHTML = `
                <span class="text-green-800 text-sm">${user.handle}</span>
                <button class="ml-1 text-green-700 hover:text-green-900">
                    <i data-lucide="x" class="w-3 h-3"></i>
                </button>
            `;
            
            const removeBtn = tag.querySelector('button');
            removeBtn.addEventListener('click', function() {
                removeTag(user.id);
            });
            
            taggedUsers.appendChild(tag);
        });
        
        // Initialize icons in tags
        lucide.createIcons({
            icons: { 'x': true },
            root: taggedUsers
        });
    }
    
    // Submit post
    postForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const content = postContent.value.trim();
        if (!content && !selectedImage) return;
        
        const newPost = {
            id: Date.now(),
            user: 'YourUsername',
            handle: '@your_handle',
            content: content,
            image: selectedImage,
            timestamp: 'Just now',
            likes: 0,
            comments: 0,
            reposts: 0,
            tags: selectedTags.map(tag => tag.handle)
        };
        
        // Add post to feed
        renderPost(newPost);
        
        // Reset form
        postContent.value = '';
        charCounter.textContent = '0/160';
        selectedImage = null;
        imagePreview.classList.add('hidden');
        selectedTags = [];
        taggedUsers.innerHTML = '';
        taggedUsers.classList.add('hidden');
        
        // Disable submit button
        submitPost.classList.add('opacity-50', 'cursor-not-allowed');
        submitPost.disabled = true;
    });
    
    // Initialize the app
    initializeFeed();
});
