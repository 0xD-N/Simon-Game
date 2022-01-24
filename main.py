import random
import os
import time

#making simon algorithm
run = True

#holds user and computer sequences respectively
computer_sequence = []
user_sequence = []

#computer will automatically generate a number to go into sequence (with the use of random numbers of course)

#used for indexing
i = 0

#holds rounds
round = 0

#while run is true (true by default of course)
while(run):
    
    
    #used for initial formatting
    if(i == 0):
        print("Starting new Sequence...")
        time.sleep(2)
        os.system("cls")
    
    #clear user sequence each time the loop repeats
    user_sequence = []
    
    #put a random number in the computer sequence
    computer_sequence.append(random.randint(1,4))
    
    #print each sequence to the user and clear console each sequence
    for i in range(len(computer_sequence)):
        
        print(f"\n\n{computer_sequence[i]}")
        time.sleep(2)
        os.system("cls")
    
    #user is now supposed to match sequence
    print("Enter number presented by sequence: ", end=" ")
    
    #used for input
    num = 0
    
    #used for indexing
    j = 0
    
    #while the length of the user sequence is less than the computer's get input
    while(len(user_sequence) != len(computer_sequence)):
        
        num = int(input())
        
        user_sequence.append(num)
        
        #checks if the element at index j is equal to the element at index j in computer sequence 
        if(user_sequence[j] == computer_sequence[j]):
            os.system("cls")
        #if the user types a different number than the computer than the loop exits and outer loop stops
        else:
            run=False
            break
        j += 1
        
    i+= 1
    round += 1

print("GAME OVER")

print(f"\nYou made it to round {round}!")



 
# ALSO

#we must also write an algorithm to highlight the sequence and play the audio for each sequence for each turn. We must give each image an id.


