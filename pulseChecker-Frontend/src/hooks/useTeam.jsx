import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { mockDataService } from "../services/mockDataService";
import { useNavigate } from "react-router-dom";

export const useTeams = () => {
  return useQuery({
    queryKey: ["teams"],
    queryFn: () => mockDataService.getTeams(),
  });
};

export const useTeam = (teamId) => {
  return useQuery({
    queryKey: ["team", teamId],
    queryFn: () => mockDataService.getTeam(teamId),
    enabled: !!teamId,
  });
};

export const useCreateTeam = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (teamData) => mockDataService.createTeam(teamData),
    onSuccess: (newTeam) => {
      queryClient.invalidateQueries({ queryKey: ["teams"] });
      navigate(`/team/${newTeam.id}`);
    },
  });
};

export const useJoinTeam = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (inviteCode) => mockDataService.joinTeam(inviteCode),
    onSuccess: (team) => {
      queryClient.invalidateQueries({ queryKey: ["teams"] });
      navigate(`/team/${team.id}`);
    },
  });
};

export const useTeamActivity = (teamId, days = 30) => {
  return useQuery({
    queryKey: ["team-activity", teamId, days],
    queryFn: () => mockDataService.getTeamActivity(teamId, days),
    enabled: !!teamId,
  });
};

export const useMemberActivity = (teamId, memberId, days = 30) => {
  return useQuery({
    queryKey: ["member-activity", teamId, memberId, days],
    queryFn: () => mockDataService.getMemberActivity(teamId, memberId, days),
    enabled: !!teamId && !!memberId,
  });
};

export const useTeamMetrics = (teamId) => {
  return useQuery({
    queryKey: ["team-metrics", teamId],
    queryFn: () => mockDataService.getTeamMetrics(teamId),
    enabled: !!teamId,
  });
};

export const useActivityCategories = () => {
  return useQuery({
    queryKey: ["activity-categories"],
    queryFn: () => mockDataService.getActivityCategories(),
  });
};
