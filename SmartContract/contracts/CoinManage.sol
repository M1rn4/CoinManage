// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract UserManagement {
    
    enum TaskStatus { ToDo, InProcess, End, Approved }

    struct User {
        string name;
        string imageUrl;
        string description;
        string twitter;
        string telegram;
        string ens;
        mapping(uint256 => Project) projects;
        uint256 projectCount;
    }

    struct Project {
        address owner;
        string name;
        string description;
        address freelancer;
        mapping(uint256 => Task) tasks;
        uint256 taskCount;
        uint256 totalPayment;
        bool paymentApproved;
    }

    struct Task {
        string name;
        uint256 time;
        uint256 price;
        TaskStatus status;
        address holderAddress;
        bool paymentApproved;
    }

    mapping(address => User) public users;
    mapping(uint256 => address) public userAddressesArray;
    uint256 public usersCount;

    event UserAdded(address indexed userAddress, string name);
    event UserUpdated(address indexed userAddress, string name);
    event ProjectAdded(address indexed userAddress, uint256 projectId, string name);
    event ProjectUpdated(address indexed userAddress, uint256 projectId, string name);
    event TaskAdded(address indexed userAddress, uint256 projectId, uint256 taskId, string name);
    event TaskUpdated(address indexed userAddress, uint256 projectId, uint256 taskId, TaskStatus status);
    event PaymentMade(address indexed userAddress, uint256 projectId, uint256 amount);
    event PaymentApproved(address indexed userAddress, uint256 projectId);

    function getUsers() public view returns (address[] memory) {
        address[] memory userAddresses = new address[](usersCount);

        for (uint256 i = 0; i < usersCount; i++) {
            userAddresses[i] = userAddressesArray[i];
        }

        return userAddresses;
    }

    function createUser(
        string memory name,
        string memory imageUrl,
        string memory description,
        string memory twitter,
        string memory telegram,
        string memory ens
    ) public {
        User storage user = users[msg.sender];
        user.name = name;
        user.imageUrl = imageUrl;
        user.description = description;
        user.twitter = twitter;
        user.telegram = telegram;
        user.ens = ens;

        userAddressesArray[usersCount] = msg.sender;
        usersCount++;

        emit UserAdded(msg.sender, name);
    }
    

    function getUser(address userAddress) public view returns (
        string memory,
        string memory,
        string memory,
        string memory,
        string memory,
        string memory,
        uint256
    ) {
        User storage user = users[userAddress];
        return (
            user.name,
            user.imageUrl,
            user.description,
            user.twitter,
            user.telegram,
            user.ens,
            user.projectCount
        );
    }

    function setUser(
        string memory name,
        string memory imageUrl,
        string memory description,
        string memory twitter,
        string memory telegram,
        string memory ens
    ) public {
        User storage user = users[msg.sender];
        user.name = name;
        user.imageUrl = imageUrl;
        user.description = description;
        user.twitter = twitter;
        user.telegram = telegram;
        user.ens = ens;

        emit UserAdded(msg.sender, name);
    }

    function updateUser(
        string memory name,
        string memory imageUrl,
        string memory description,
        string memory twitter,
        string memory telegram,
        string memory ens
    ) public {
        User storage user = users[msg.sender];
        user.name = name;
        user.imageUrl = imageUrl;
        user.description = description;
        user.twitter = twitter;
        user.telegram = telegram;
        user.ens = ens;

        emit UserUpdated(msg.sender, name);
    }

    function createProject(
        uint256 projectId,
        string memory name,
        string memory description,
        address freelancer
    ) public {
        User storage user = users[msg.sender];
        Project storage project = user.projects[projectId];
        
        project.owner = msg.sender;
        project.name = name;
        project.description = description;
        project.freelancer = freelancer;
        project.taskCount = 0;
        project.totalPayment = 0;
        project.paymentApproved = false;
        
        user.projectCount++;

        emit ProjectAdded(msg.sender, projectId, name);
    }

    function getProject(address userAddress, uint256 projectId) public view returns (
        address,
        string memory,
        string memory,
        address,
        uint256,
        uint256,
        bool
    ) {
        User storage user = users[userAddress];
        Project storage project = user.projects[projectId];
        return (
            project.owner,
            project.name,
            project.description,
            project.freelancer,
            project.taskCount,
            project.totalPayment,
            project.paymentApproved
        );
    }

    function updateProject(
        uint256 projectId,
        string memory name,
        string memory description,
        address freelancer
    ) public {
        User storage user = users[msg.sender];
        Project storage project = user.projects[projectId];
        project.name = name;
        project.description = description;
        project.freelancer = freelancer;

        emit ProjectUpdated(msg.sender, projectId, name);
    }

    function getProjectsByUser(address userAddress) public view returns (uint256[] memory) {
        User storage user = users[userAddress];
        uint256[] memory projectIds = new uint256[](user.projectCount);

        for (uint256 i = 0; i < user.projectCount; i++) {
            projectIds[i] = i;
        }

        return projectIds;
    }

    function createTask(
        uint256 projectId,
        string memory name,
        uint256 time,
        uint256 price,
        address holderAddress
    ) public {
        User storage user = users[msg.sender];
        Project storage project = user.projects[projectId];
        TaskStatus defaultStatus = TaskStatus.ToDo;
        project.tasks[project.taskCount] = Task(name, time, price, defaultStatus, holderAddress, false);
        project.taskCount++;

        emit TaskAdded(msg.sender, projectId, project.taskCount - 1, name);
    }

    function getTask(address userAddress, uint256 projectId, uint256 taskId) public view returns (
        string memory,
        uint256,
        uint256,
        TaskStatus,
        address
    ) {
        User storage user = users[userAddress];
        Project storage project = user.projects[projectId];
        Task storage task = project.tasks[taskId];
        return (
            task.name,
            task.time,
            task.price,
            task.status,
            task.holderAddress
        );
    }

    function getTasksByProject(address userAddress, uint256 projectId) public view returns (uint256[] memory) {
        User storage user = users[userAddress];
        Project storage project = user.projects[projectId];
        uint256[] memory taskIds = new uint256[](project.taskCount);

        for (uint256 i = 0; i < project.taskCount; i++) {
            taskIds[i] = i;
        }

        return taskIds;
    }

    function makePayment(uint256 projectId) public payable {
        User storage user = users[msg.sender];
        Project storage project = user.projects[projectId];

        require(project.freelancer != address(0), "Freelancer address not set for this project");
        //require(project.paymentApproved == false, "Payment has already been approved");

        uint256 totalToDoPayment = 0;
        for (uint256 i = 0; i < project.taskCount; i++) {
            Task storage task = project.tasks[i];
            if (task.status == TaskStatus.ToDo) {
                totalToDoPayment += task.price;
                task.status = TaskStatus.InProcess;
                task.paymentApproved = true;
            }
        }

        require(msg.value >= totalToDoPayment, "Insufficient payment amount");

        project.totalPayment += msg.value;

        emit PaymentMade(msg.sender, projectId, msg.value);
    }

    function approvePayment(uint256 projectId) public {
        User storage user = users[msg.sender];
        Project storage project = user.projects[projectId];

        require(project.owner == msg.sender, "Only the project owner can approve the payment");
        //require(project.paymentApproved == false, "Payment has already been approved");

        uint256 totalEndPayment = 0;
        for (uint256 i = 0; i < project.taskCount; i++) {
            Task storage task = project.tasks[i];
            if (task.status == TaskStatus.End) {
                totalEndPayment += task.price;
                task.paymentApproved = true;
            }
        }

        require(project.totalPayment >= totalEndPayment, "Insufficient balance in contract");

        project.totalPayment -= totalEndPayment;

        payable(project.freelancer).transfer(totalEndPayment);

        // if (project.totalPayment == 0) {
        //     project.paymentApproved = true;
        //     emit PaymentApproved(msg.sender, projectId);
        // }
    }

}
